import { getRandomId } from './index';
import { createDoc, updateDoc, getDoc } from './firestore';
import { CLOUD_FUNCTIONS, cloudFunction } from './CloudFunctions';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import * as ROUTES from '../constants/routes';

export const copyAssessment = (data, user, history, oldId) => {
  console.log('Copying assessment…', data);
  // separate assessment ID so new doc doesn't have assessment ID
  const { id, ...rest } = data;
  // copy assessment data
  const copiedAssessment = {
    ...rest,
    UID: user.id,
    outcome: 'pending',
    screened: false,
    submissionContent: [],
    assessmentId: data.assessmentId || id,
    submitted: false,
    smartLink: {},
  };
  // randomiser
  if (
    data.questionsDisplayed > 0 &&
    data.questions &&
    data.questions.length > 0
  ) {
    if (data.randomiseQuestionOrder) {
      const cq = [];
      const cqi = [];

      while (cq.length < data.questionsDisplayed) {
        const index = Math.floor(Math.random() * data.questions.length);
        if (!cqi.includes(index)) {
          cqi.push(index);
          cq.push(data.questions[index]);
        }
      }

      copiedAssessment.copiedQuestions = cq;
      copiedAssessment.copiedQuestionsIndices = cqi;
    } else {
      copiedAssessment.copiedQuestions = data.questions;
    }
  }
  // create random email
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
      cloudFunction(
        CLOUD_FUNCTIONS.CREATE_SMART_LINK,
        { route: 'ideo', data: { submissionId: docRef.id } },
        res => {
          docRef.update({ smartLink: res.data });
        },
        err => {
          console.error('error creating smartlink', err);
        }
      );
    }

    // set first submission to resubmitted to disable
    if (!!oldId) {
      updateDoc(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        oldId,
        { resubmitted: docRef.id }
      ).then(docRef => {
        console.log('resubmitted set to true for', docRef);
      });
      history.push(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    } else {
      history.replace(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    }

    // touch assessment
    const newTouchedAssessments = user.touchedAssessments || [];
    newTouchedAssessments.push(data.assessmentId || data.id);
    updateDoc(COLLECTIONS.users, user.id, {
      touchedAssessments: newTouchedAssessments,
    });
    // .then(() => {
    //   history.push(`${ROUTES.ASSESSMENT}?id=${docRef.id}&yours=true`);
    // });
  });
};

export const copyAssessmentForResubmission = async (data, user, history) => {
  const assessment = await getDoc(COLLECTIONS.assessments, data.assessmentId);
  copyAssessment(assessment, user, history, data.id);
};

export const checkSmartLink = (data, user) => {
  // if has smartlink, verify it still works
  if (
    data.submissionType === 'ideo' &&
    data.smartLink &&
    data.smartLink.key &&
    data.smartLink.secret
  ) {
    console.log('Checking SmartLink…', data.smartLink);
    cloudFunction(
      CLOUD_FUNCTIONS.SMART_LINK,
      { slKey: data.smartLink.key, slSecret: data.smartLink.secret },
      res => {
        console.log('smartlink response', res.data);
        if (
          !res.data.success ||
          res.data.route !== 'ideo' ||
          res.data.doc.data.submissionId !== data.id
        ) {
          console.log('Re-generating SmartLink…');
          cloudFunction(
            CLOUD_FUNCTIONS.CREATE_SMART_LINK,
            { route: 'ideo', data: { submissionId: data.id } },
            res => {
              updateDoc(
                `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
                data.id,
                { smartLink: res.data }
              ).then(() => {
                console.log('Successfully re-generated SmartLink');
              });
            },
            err => {
              console.error('error creating smartlink', err);
            }
          );
        }
      },
      err => {
        console.error('error checking smartlink', err);
      }
    );
  }
};
