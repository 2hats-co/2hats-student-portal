import moment from 'moment';

import {
  DocWithId,
  CoursesDoc,
  UsersCoursesDoc,
  AssessmentsDoc,
  UsersAssessmentsDoc,
  JobsDoc,
  UsersJobsDoc,
  UsersDoc,
} from '@bit/twohats.common.db-types';
import { IOneCardTwoProps } from 'components/OneCardTwo';
import { StatusChipProps } from 'components/OneCardTwo/StatusChip';

import {
  INDUSTRIES,
  GRADIENT_COLORS,
  INDUSTRY_DISPLAY_NAMES,
} from '@bit/twohats.common.constants';
import { CARD_TYPES } from 'constants/cards';

import * as ROUTES from 'constants/routes';
import { getSkillsNotAchieved, getJobAvailability, getCanApply } from './jobs';
import { getPrettyDateString } from './date';

/**
 * Cards can take documents of type assessment, job, or course
 */
export type CardDoc =
  | DocWithId<AssessmentsDoc>
  | DocWithId<UsersAssessmentsDoc>
  | DocWithId<JobsDoc>
  | DocWithId<UsersJobsDoc>
  | DocWithId<CoursesDoc>
  | DocWithId<UsersCoursesDoc>;

/**
 * Returns display name or name given if not found
 */
export const getIndustryDisplayName = (industry: INDUSTRIES) =>
  INDUSTRY_DISPLAY_NAMES[industry] || industry;

/**
 * Gets a displayable string for a list of industries
 */
export const getIndustry = (industry: INDUSTRIES) => {
  if (Array.isArray(industry))
    return industry.map(x => getIndustryDisplayName(x)).join(' / ');
  return getIndustryDisplayName(industry);
};

export const getIndustryGradient = (industry: INDUSTRIES) => ({
  colors: Array.isArray(industry)
    ? industry.map((x: INDUSTRIES) => GRADIENT_COLORS[x])
    : [GRADIENT_COLORS[industry]],
  baseColor: GRADIENT_COLORS.BASE,
});

export const generateCourseCard = (
  data: DocWithId<CoursesDoc> | DocWithId<UsersCoursesDoc>,
  options: { showUpdatedAt?: boolean } = {}
): IOneCardTwoProps => {
  let status: StatusChipProps | undefined = undefined;

  if ('completed' in data) {
    if (data.completed === false) {
      status = { label: 'Ongoing', variant: 'ongoing' };
    } else if (data.completed === true) {
      status = { label: 'Completed', variant: 'pass' };
    } else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2) {
      status = { label: 'New', variant: 'new' };
    }
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',

    industry: data.category,
    time: options.showUpdatedAt
      ? getPrettyDateString(data.updatedAt.toDate())
      : data.duration,

    icon: 'industry',
    skills: data.skillsAssociated || [],
    skillsHeader: 'covered',
    maxSkills: 1,

    action: data.hasOwnProperty('completed')
      ? 'completed' in data && data.completed
        ? 'View'
        : 'Continue'
      : 'Get started',
    route: `${ROUTES.COURSE_REDIRECT}?id=${data.LWid}`,

    status,

    media: { type: 'video', src: data.videoUrl },
  };
};

export const generateAssessmentCard = (
  data: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>,
  options: { user?: UsersDoc; showUpdatedAt?: boolean } = {}
): IOneCardTwoProps => {
  let action = 'Get started';
  let status: StatusChipProps | undefined = undefined;

  // From users/assessments subcollection
  if ('assessmentId' in data) {
    if (!data.submitted) {
      action = 'Continue';
      status = { label: 'Ongoing', variant: 'ongoing' };
    } else {
      if (data.outcome === 'pass') {
        action = 'View';
        status = { label: 'Passed', variant: 'pass' };
      } else if (data.outcome === 'fail') {
        if (data.resubmitted) {
          action = 'View';
          status = { label: 'Resubmitted', variant: 'ongoing' };
        } else {
          action = 'Resubmit';
          status = { label: 'Try again', variant: 'fail' };
        }
      } else if (data.outcome === 'disqualify') {
        action = data.resubmitted ? 'View' : 'Resubmit';
        status = { label: 'Disqualified', variant: 'fail' };
      } else {
        // Submitted but no outcome yet/not screened
        action = 'View';
        status = { label: 'Submitted', variant: 'submitted' };
      }
    }
  }
  // Otherwise, if user has gotten the skill
  else if (
    options.user &&
    Array.isArray(options.user.skills) &&
    options.user.skills.includes(data.id)
  ) {
    // We only know that they started this, so show ongoing
    action = 'View';
    status = { label: 'Passed', variant: 'pass' };
  }
  // Otherwise, if user is supplied, check if in touchedAssessments
  else if (
    options.user &&
    Array.isArray(options.user.touchedAssessments) &&
    options.user.touchedAssessments.includes(data.id)
  ) {
    // We only know that they started this, so show ongoing
    action = 'Continue';
    status = { label: 'Ongoing', variant: 'ongoing' };
  }
  // Otherwise, mark as new
  else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2) {
    status = { label: 'New', variant: 'new' };
  }

  return {
    id: data.id,
    title: data.title,

    industry: data.category,
    time: options.showUpdatedAt
      ? getPrettyDateString(data.updatedAt.toDate())
      : data.duration,

    description:
      data.briefing || data.companyDescription || data.jobDescription || '',

    status,

    media: data.image ? { type: 'image', src: data.image.url } : undefined,
    icon: 'industry',

    route: `${ROUTES.ASSESSMENT}/${data.id}${
      'assessmentId' in data && data.assessmentId ? '?yours=true' : ''
    }`,
    action,
  };
};

export const generateJobCard = (
  data: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>,
  options: { user?: UsersDoc } = {}
): IOneCardTwoProps => {
  let status: StatusChipProps | undefined = undefined;

  // Get difference between today and closingDate
  const { jobClosed, diffDays } = getJobAvailability(data);

  // user can apply if not closed && user has all the skills &&
  // user hasn't already applied
  const canApply = options.user ? getCanApply(options.user, data) : false;

  let action = canApply ? 'Apply now' : 'Learn more';
  const animatedActionButton = !!canApply;

  // From users/jobs subcollection
  if ('jobId' in data && data.jobId) {
    status = { label: 'Applied', variant: 'pass' };
    action = 'View';
  }
  // Otherwise, if closed for applications
  else if (jobClosed) status = { label: 'Closed', variant: 'closed' };
  // Otherwise, if less than 3 days to closing date
  else if (diffDays <= 3) status = { label: 'Closing soon', variant: 'fail' };
  // Otherwise, mark as new
  else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2)
    status = { label: 'New', variant: 'new' };

  return {
    id: data.id,
    title: data.title,

    industry: data.industry,
    time: moment(data.closingDate.toDate()).format('D MMMM'),

    description: data.companyDescription || '',

    skills: data.skillsRequired || [],
    skillsHeader: 'Required',

    status,

    icon: data.image && data.image.url,

    route: `${ROUTES.JOB}/${data.id}${
      'jobId' in data && data.jobId ? '?yours=true' : ''
    }`,
    action,
    animatedActionButton,
  };
};

export const CARD_GENERATORS = {
  [CARD_TYPES.COURSE]: generateCourseCard,
  [CARD_TYPES.ASSESSMENT]: generateAssessmentCard,
  [CARD_TYPES.JOB]: generateJobCard,
};

export const getPrioritisedCards = (cards: CardDoc[], user: UsersDoc) => {
  if (!Array.isArray(user.deprioritisedIndustries))
    user.deprioritisedIndustries = [];

  if (cards.length === 0)
    return { sortedCards: [], deprioritisedStartIndex: -1 };

  let deprioritisedStartIndex = -1;
  const prioritisedCards: CardDoc[] = [];
  const deprioritisedCards: CardDoc[] = [];

  cards.forEach((x: CardDoc) => {
    let isDeprioritised = false;

    let industry: INDUSTRIES | INDUSTRIES[];
    if ('industry' in x) industry = x.industry;
    else if ('category' in x) industry = x.category;
    else return;

    // Support for hybrid-industry assessments
    if (user.deprioritisedIndustries) {
      if (Array.isArray(industry)) {
        isDeprioritised =
          industry.length === 1 &&
          user.deprioritisedIndustries.includes(industry[0]);
      } else {
        isDeprioritised = user.deprioritisedIndustries.includes(industry);
      }
    }

    if (isDeprioritised) deprioritisedCards.push(x);
    else prioritisedCards.push(x);
  });

  // Store the index of the first deprioritised card
  deprioritisedStartIndex = prioritisedCards.length;

  // Stitch them back together in order
  const sortedCards = [...prioritisedCards, ...deprioritisedCards];

  return { sortedCards, deprioritisedStartIndex };
};

export const prioritiseJobListings = (cards: CardDoc[], user: any) => {
  const canApplyJobs: CardDoc[] = [];
  let openJobs: CardDoc[] = [];
  let pastJobs: CardDoc[] = [];

  cards.forEach(data => {
    if (!('closingDate' in data) || !('skillsRequired' in data)) return;

    // Get difference between today and closingDate
    const diffDays = -1 * moment().diff(data.closingDate.toDate(), 'days');

    // user can apply if not closed && user has all the skills
    const canApply =
      diffDays > 0 &&
      getSkillsNotAchieved(user, data.skillsRequired).length === 0;

    if (canApply) canApplyJobs.push(data);
    else if (diffDays > 0) openJobs.push(data);
    else pastJobs.push(data);
  });

  // Sort canApplyJobs and openJobs by closingDate ascending
  const sortByClosingDate = (descending: boolean) => (
    a: CardDoc,
    b: CardDoc
  ) => {
    if (!('closingDate' in a) || !('closingDate' in b)) return -1;
    return descending
      ? b.closingDate.toDate().getTime() - a.closingDate.toDate().getTime()
      : a.closingDate.toDate().getTime() - b.closingDate.toDate().getTime();
  };

  // Make sure can apply is always first
  // Then prioritise all open jobs, by industry
  canApplyJobs.sort(sortByClosingDate(false));
  openJobs = getPrioritisedCards(openJobs.sort(sortByClosingDate(false)), user)
    .sortedCards;
  pastJobs = getPrioritisedCards(pastJobs.sort(sortByClosingDate(true)), user)
    .sortedCards;

  return [...canApplyJobs, ...openJobs, ...pastJobs];
};
