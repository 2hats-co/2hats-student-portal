import moment from 'moment';

import {
  GRADIENT_COLORS,
  CARD_TYPES,
  INDUSTRY_DISPLAY_NAMES,
} from 'constants/cards';
import * as ROUTES from 'constants/routes';
import { getSkillsNotAchieved } from './jobs';
import { getPrettyDateString } from './date';

// Returns display name or name given if not found
export const getIndustryDisplayName = industry =>
  INDUSTRY_DISPLAY_NAMES[industry] || industry;

export const getIndustryGradient = industry => ({
  colors: Array.isArray(industry)
    ? industry.map(x => GRADIENT_COLORS[x])
    : [GRADIENT_COLORS[industry]],
  baseColor: GRADIENT_COLORS.BASE,
});

export const generateCourseCard = (data, options) => {
  if (!options) options = {};

  let status = null;

  if (data.completed === false) {
    status = { label: 'Ongoing', variant: 'ongoing' };
  } else if (data.completed === true) {
    status = { label: 'Completed', variant: 'pass' };
  } else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2) {
    status = { label: 'New', variant: 'new' };
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
      ? data.completed
        ? 'View'
        : 'Continue'
      : 'Get started',
    route: `${ROUTES.COURSE_REDIRECT}?id=${data.LWid}`,

    status,

    media: { type: 'video', src: data.videoUrl },
  };
};

export const generateAssessmentCard = (data, options) => {
  if (!options) options = {};

  let action = 'Get started';
  let status = null;

  // From users/assessments subcollection
  if (data.assessmentId) {
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
  // Otherwise, if user is supplied, check if in touchedAssessments
  else if (options.user && Array.isArray(options.user.touchedAssessments)) {
    if (options.user.touchedAssessments.includes(data.id)) {
      // We only know that they started this, so show ongoing
      action = 'View';
      status = { label: 'Ongoing', variant: 'ongoing' };
    }
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

    media: { type: 'image', src: data.image && data.image.url },
    icon: 'industry',

    route: `${ROUTES.ASSESSMENT}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,
    action,
  };
};

export const generateJobCard = (data, options) => {
  if (!options) options = {};
  if (!options.user) options.user = {};

  let status = null;

  // Get difference between today and closingDate
  const diffDays = -1 * moment().diff(data.closingDate.toDate(), 'days');

  // user can apply if not closed && user has all the skills &&
  // user hasn't already applied
  const canApply =
    diffDays > 0 &&
    !data.jobId &&
    getSkillsNotAchieved(options.user, data.skillsRequired).length === 0;
  let action = canApply ? 'Apply now' : 'Learn more';
  const animatedActionButton = !!canApply;

  // From users/jobs subcollection
  if (data.jobId) {
    status = { label: 'Applied', variant: 'pass' };
    action = 'View';
  }
  // Otherwise, if closed for applications
  else if (diffDays <= 0) status = { label: 'Closed', variant: 'closed' };
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

    route: `${ROUTES.JOB}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,
    action,
    animatedActionButton,
  };
};

export const CARD_GENERATORS = {
  [CARD_TYPES.COURSE]: generateCourseCard,
  [CARD_TYPES.ASSESSMENT]: generateAssessmentCard,
  [CARD_TYPES.JOB]: generateJobCard,
};

export const getPrioritisedCards = (cards, user, industryField) => {
  if (!industryField) industryField = 'industry';
  if (!user) user = {};
  if (!Array.isArray(user.deprioritisedIndustries))
    user.deprioritisedIndustries = [];

  if (cards.length === 0)
    return { sortedCards: [], deprioritisedStartIndex: -1 };

  let deprioritisedStartIndex = -1;
  const prioritisedCards = [];
  const deprioritisedCards = [];

  cards.forEach(x => {
    let isDeprioritised = false;

    // Support for hybrid-industry assessments
    if (Array.isArray(x[industryField])) {
      isDeprioritised =
        x[industryField].length === 1 &&
        user.deprioritisedIndustries.includes(x[industryField][0]);
    } else {
      isDeprioritised = user.deprioritisedIndustries.includes(x[industryField]);
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

export const prioritiseJobListings = (cards, user) => {
  const canApplyJobs = [];
  let openJobs = [];
  let pastJobs = [];

  cards.forEach(data => {
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
  const sortByClosingDate = descending => (a, b) =>
    descending
      ? b.closingDate.toDate() - a.closingDate.toDate()
      : a.closingDate.toDate() - b.closingDate.toDate();

  // Make sure can apply is always first
  // Then prioritise all open jobs, by industry
  canApplyJobs.sort(sortByClosingDate(false));
  openJobs = getPrioritisedCards(openJobs.sort(sortByClosingDate(false)), user)
    .sortedCards;
  pastJobs = getPrioritisedCards(pastJobs.sort(sortByClosingDate(true)), user)
    .sortedCards;

  return [...canApplyJobs, ...openJobs, ...pastJobs];
};
