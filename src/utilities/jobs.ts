import moment from 'moment';

import {
  DocWithId,
  UsersDoc,
  JobsDoc,
  UsersJobsDoc,
} from '@bit/twohats.common.db-types';

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
