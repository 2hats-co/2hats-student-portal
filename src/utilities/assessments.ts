import firebase from 'firebase/app';

import { getRandomId, removeHtmlTags } from './index';
import { createDoc, updateDoc, updateDocSilently, getDoc } from './firestore';
import { CLOUD_FUNCTIONS, cloudFn } from './CloudFunctions';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import * as ROUTES from '../constants/routes';

import { History } from 'history';
import {
  DocWithId,
  UsersDoc,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';

export type SuperAssessmentDoc =
  | DocWithId<AssessmentsDoc>
  | DocWithId<UsersAssessmentsDoc>;

/**
 * Copies the main assessment doc into a UsersAssessmentsDoc
 * for the user submission
 * @param data - Original assessment document
 * @param user - User document
 * @param history - History object from react router to redirect to new page
 * @param oldId - ID of previous submission. Used by copyAssessmentForResubmission
 */
export const copyAssessment = (
  data: DocWithId<AssessmentsDoc>,
  user: DocWithId<UsersDoc>,
  history: History,
  oldId?: string
) => {
  console.log('Copying assessment…', data);
  // separate assessment ID so new doc doesn't have assessment ID
  const { id, ...rest } = data;

  /**
  REMOVED — This function only accepts (original) AssessmentsDoc types

  // If there is an assessmentId in data, then this is a resubmission, and
  // that is the original assessment document's ID. If not, use the document
  // ID, since this would be the original assessment doc.
  const originalAssessmentId =
    'assessmentId' in data && data.assessmentId ? data.assessmentId : id;
  */
  const originalAssessmentId = id;

  // copy assessment data
  const copiedAssessment: UsersAssessmentsDoc = {
    ...rest,
    UID: user.id,
    outcome: 'pending',
    screened: false,
    submissionContent: [],
    submitted: false,
    assessmentId: originalAssessmentId,
    viewedFeedback: false,
  };
  // Copy a subset of the questions, if required
  if (
    'questionsDisplayed' in data &&
    data.questionsDisplayed &&
    data.questionsDisplayed > 0 &&
    data.questions &&
    data.questions.length > 0
  ) {
    // Randomise question order if the flag is present
    // in the main assessments document.
    // NOTE: From admin portal, users will only be able to select the number
    // of questions to display if randomiseQuestionOrder is also set, so
    // we MUST ignore questionsDisplayed here if !randomiseQuestionOrder
    if (data.randomiseQuestionOrder) {
      // The question texts to copy
      const cq: string[] = [];
      // The indices from which each question was copied
      // Used to map new indices to old
      const cqi: number[] = [];

      // Randomise
      while (cq.length < data.questionsDisplayed) {
        const index = Math.floor(Math.random() * data.questions.length);
        // Ensure there are no duplicates, then copy
        if (!cqi.includes(index)) {
          cqi.push(index);
          cq.push(data.questions[index]);
        }
      }

      // Store in user submission document
      copiedAssessment.copiedQuestions = cq;
      copiedAssessment.copiedQuestionsIndices = cqi;
      // Otherwise, if we’re not randomising, copy all the questions
    } else {
      copiedAssessment.copiedQuestions = data.questions;
    }
  }

  // create random email for mailchimp
  if (data.submissionType === 'mailchimp')
    copiedAssessment.mcEmail = `mc+${getRandomId()}@2hats.com`;

  // create copy in user's assessment subcollection
  createDoc(
    `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    copiedAssessment
  ).then(docRef => {
    console.log('Created submission doc', docRef.id);

    // create IDEO smartLink
    if (data.submissionType === 'ideo') {
      cloudFn(CLOUD_FUNCTIONS.CREATE_SMART_LINK, {
        route: 'ideo',
        data: { submissionId: docRef.id },
      })
        .then(res => {
          docRef.update({ smartLink: res.data });
        })
        .catch(err => {
          console.error('error creating smartlink', err);
        });
    }

    // Set first submission to resubmitted to disable
    if (!!oldId) {
      updateDoc(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        oldId,
        { resubmitted: docRef.id }
      ).then(docRef => {
        console.log('resubmitted set to true for', docRef);
      });
      // Go to new assessment
      history.push(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    } else {
      // Replace the current link with the submission link
      history.replace(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    }

    // Touch assessment in user doc
    const newTouchedAssessments = user.touchedAssessments || [];
    newTouchedAssessments.push(originalAssessmentId);
    updateDoc(COLLECTIONS.users, user.id, {
      touchedAssessments: newTouchedAssessments,
    });
    // .then(() => {
    //   history.push(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    // });
  });
};

/**
 * Copies the UsersAssessmentsDoc for a re-submission.
 * Wrapper for copyAssessment function, but passes in oldID.
 * @param data - Original assessment document
 * @param user - User document
 * @param history - History object from react router to redirect to new page
 */
export const copyAssessmentForResubmission = async (
  data: DocWithId<UsersAssessmentsDoc>,
  user: DocWithId<UsersDoc>,
  history: History
) => {
  // Type check for SuperAssessmentDoc – must be UsersAssessmentDoc
  if (!('assessmentId' in data))
    throw new Error('Invalid users assessment doc to copy');

  // Otherwise, get the original document to copy from (so we get new data)
  const assessment: DocWithId<UsersAssessmentsDoc> = await getDoc(
    COLLECTIONS.assessments,
    data.assessmentId
  );
  // And make sure to pass in the oldId parameter
  copyAssessment(assessment, user, history, data.id);
};

/**
 * Ensures smartlink for IDEO submission still works and
 * re-generates smartlink if it's broken.
 * @param data - user assessment document
 * @param user - user document
 */
export const checkSmartLink = (
  data: DocWithId<UsersAssessmentsDoc>,
  user: DocWithId<UsersDoc>
) => {
  // If it has no smartlink, end function
  if (
    data.submissionType !== 'ideo' ||
    !data.smartLink ||
    !data.smartLink.key ||
    !data.smartLink.secret
  )
    return;

  // If it has a smartlink, verify it still works
  console.log('Checking SmartLink…', data.smartLink);

  // Call the same SmartLink cloud function and use its result to verify
  cloudFn(CLOUD_FUNCTIONS.SMART_LINK, {
    slKey: data.smartLink.key,
    slSecret: data.smartLink.secret,
  })
    .then(res => {
      console.log('smartlink response', res.data);

      // If the result is a success, we can end this function
      if (
        res.data.success &&
        res.data.route === 'ideo' &&
        res.data.doc.data.submissionId === data.id
      )
        return;

      // Otherwise, re-generate the smartlink
      console.log('Re-generating SmartLink…');
      cloudFn(CLOUD_FUNCTIONS.CREATE_SMART_LINK, {
        route: 'ideo',
        data: { submissionId: data.id },
      })
        .then(res => {
          // And save it to the UsersAssessmentsDoc that was passed in
          // but DON'T update the updatedAt time
          updateDocSilently(
            `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
            data.id,
            { smartLink: res.data }
          ).then(() => {
            console.log('Successfully re-generated SmartLink');
          });
        })
        .catch(err => {
          console.error('error creating smartlink', err);
        });
    })
    .catch(err => {
      console.error('error checking smartlink', err);
    });
};

/**
 * Checks if the submission answers is empty
 * @param assessmentData - The actual UsersAssessmentsDoc
 * @param answers - The answers to save
 */
export const isSubmissionEmpty = (
  assessmentData: SuperAssessmentDoc,
  answers: any[]
): boolean => {
  let disableSubmission =
    answers.length === 0 ||
    answers.includes(undefined) ||
    ('copiedQuestions' in assessmentData &&
      assessmentData.copiedQuestions &&
      answers.length < assessmentData.copiedQuestions.length) ||
    false;

  answers.forEach(x => {
    if (!x) {
      disableSubmission = true;
      return;
    }
    if (typeof x === 'string' && removeHtmlTags(x).length === 0) {
      disableSubmission = true;
      return;
    }
    if (
      (assessmentData.submissionType === 'pdf' ||
        assessmentData.submissionType === 'zip') &&
      !x.url
    ) {
      disableSubmission = true;
      return;
    }
    if (
      assessmentData.submissionType === 'mailchimp' &&
      typeof x === 'object' &&
      !x.body
    ) {
      disableSubmission = true;
      return;
    }
  });

  return disableSubmission;
};

/**
 * Updates the users/assessments document with the necessary fields
 * then returns the promise.
 * @param UID - User UID to get the correct UsersAssessmentsDoc to update
 * @param submissionId - UsersAssessmentsDoc ID to get the correct UsersAssessmentsDoc to update
 * @param answers - The answers to save
 */
export const saveAssessment = (
  UID: string,
  submissionId: string,
  answers: any[]
) =>
  updateDoc(
    `${COLLECTIONS.users}/${UID}/${COLLECTIONS.assessments}`,
    submissionId,
    {
      outcome: 'pending',
      screened: false,
      submissionContent: answers,
      submitted: false,
    }
  );

/**
 * Updates the users/assessments document with the necessary fields
 * then returns the promise.
 * @param UID - User UID to get the correct UsersAssessmentsDoc to update
 * @param submissionId - UsersAssessmentsDoc ID to get the correct UsersAssessmentsDoc to update
 * @param answers - The answers to save
 */
export const submitAssessment = (
  UID: string,
  submissionId: string,
  answers: any[]
) =>
  // TODO: add an answer validator here to only allow
  // answers that are not empty whitespace
  updateDoc(
    `${COLLECTIONS.users}/${UID}/${COLLECTIONS.assessments}`,
    submissionId,
    {
      outcome: 'pending',
      screened: false,
      submissionContent: answers,
      submitted: true,
      submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      viewedFeedback: false,
    }
  );

export const markViewedFeedback = (
  assessmentData: SuperAssessmentDoc,
  UID: string
) => {
  // Ensure it's a submission doc
  if (
    !(
      'screened' in assessmentData &&
      'submitted' in assessmentData &&
      'outcome' in assessmentData
    )
  )
    return;

  // Ensure the doc has been submitted, screened, and has outcome
  if (
    !assessmentData.submitted ||
    !assessmentData.screened ||
    assessmentData.outcome === 'pending'
  )
    return;

  // Otherwise, mark assessment as viewed, with a timestamp
  if (!assessmentData.viewedFeedback || !assessmentData.viewedFeedbackAt)
    updateDocSilently(
      `${COLLECTIONS.users}/${UID}/${COLLECTIONS.assessments}`,
      assessmentData.id,
      {
        viewedFeedback: true,
        viewedFeedbackAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
    );
};
