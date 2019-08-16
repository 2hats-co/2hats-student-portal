import firebase from 'firebase/app';
import moment from 'moment';
import ReactPixel from 'react-facebook-pixel';

import reject from 'ramda/es/reject';
import isNil from 'ramda/es/isNil';

import { createDoc, updateDoc, getDoc } from './firestore';
import {
  DocWithId,
  UsersDoc,
  JobsDoc,
  UsersJobsDoc,
} from '@bit/twohats.common.db-types';
import { COLLECTIONS } from '@bit/twohats.common.constants';

/**
 * Returns the list of skills the user has not achieved yet
 * @param user User document
 * @param skillsRequired The list of skills required from the job doc
 * @returns A list of skills in the same format as `skillsRequired`
 */
export const getSkillsNotAchieved = (
  user: UsersDoc,
  skillsRequired: JobsDoc['skillsRequired']
) => {
  const skillsNotAchieved = user.skills ? [] : skillsRequired.map(x => x.id);
  skillsRequired
    .map(x => x.id)
    .forEach(x => {
      if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
    });

  return skillsNotAchieved;
};

/**
 * Returns whether the job is closed and the number of days left till close
 * @param jobData The job doc
 * @returns jobClosed, diffDays
 */
export const getJobAvailability = (
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>
) => {
  const diffDays =
    -1 * moment().diff(jobData.closingDate.toDate(), 'days', true);
  const jobClosed = diffDays <= 0;

  return { jobClosed, diffDays: Math.round(diffDays) };
};

export const getHasApplied = (
  user: UsersDoc,
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>
) =>
  ('jobId' in jobData && jobData.jobId) ||
  (user.touchedJobs &&
    user.touchedJobs.includes('jobId' in jobData ? jobData.jobId : jobData.id));

/**
 * Returns whether the student can apply for the job or not, based on:
 * 1. If the job is still open
 * 2. If the user has not applied (not a submission doc, not in touched jobs)
 * 3. If the user has all the skills required
 * @param user User document
 * @param jobData The job doc
 * @returns boolean
 */
export const getCanApply = (
  user: UsersDoc,
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>
) => {
  const { jobClosed } = getJobAvailability(jobData);

  return (
    !jobClosed &&
    !getHasApplied(user, jobData) &&
    getSkillsNotAchieved(user, jobData.skillsRequired).length === 0
  );
};

/**
 * Submits the job application and writes common fields
 * to the user’s profiles doc. Returns the `UsersJobsDoc` (job application doc)
 * for the caller to handle the redirect.
 *
 * @param user - User document
 * @param submissionContent - The answers to save
 * @param jobData - The job document
 * @returns {string} The `UsersJobsDoc` ID that was created
 */
export const submitJobApplication = async (
  user: DocWithId<UsersDoc>,
  submissionContent: UsersJobsDoc['submissionContent'],
  jobData: DocWithId<JobsDoc>
) => {
  const profileUpdates = reject(isNil, {
    jobAvailabilityStartDate: submissionContent.jobAvailabilityStartDate,
    portfolioExternal: submissionContent.portfolioExternal,
    portfolioFile: submissionContent.portfolioFile,
    resume: submissionContent.resume,
    workCultureSliders: submissionContent.workCultureSliders,
    workRestriction: submissionContent.workRestriction,
  });

  // Update the user’s profile with the common fields
  updateDoc(COLLECTIONS.profiles, user.id, profileUpdates);

  // New UsersJobsDoc to write
  const jobSubmissionDoc: { [key: string]: any } = reject(isNil, {
    ...jobData,
    id: undefined, // Don't store the ID from jobData - this is in jobId
    UID: user.id,
    outcome: 'pending',
    screened: false,
    submissionContent: { ...reject(isNil, submissionContent) },
    jobId: jobData.id,
    submitted: true,
    submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
    viewedFeedback: false,
  });

  // Copy referrerId from jobReferrerDoc
  const jobReferrerDoc = await getDoc(
    `${COLLECTIONS.users}/${user.id}/jobReferrers`,
    jobData.id
  );
  if (jobReferrerDoc && jobReferrerDoc.referrerId)
    jobSubmissionDoc.referrerId = jobReferrerDoc.referrerId;

  // Create the UsersJobsDoc
  const jobApplicationDoc = await createDoc(
    `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
    jobSubmissionDoc
  );

  // Log and track on FB Pixel
  console.log('Created job application doc', jobApplicationDoc.id);
  ReactPixel.trackCustom('SubmitApplication');

  // Store that the user has "touched" this job in their user document
  const newTouchedJobs = user.touchedJobs || [];
  newTouchedJobs.push(jobData.id);
  updateDoc(COLLECTIONS.users, user.id, {
    touchedJobs: newTouchedJobs,
  });

  // Return the created UsersJobsDoc ID so the page can be redirected
  return jobApplicationDoc.id;
};
