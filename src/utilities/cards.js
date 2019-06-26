import moment from 'moment';

import { GRADIENT_COLORS } from 'constants/cards';
import * as ROUTES from 'constants/routes';

export const getIndustryGradient = industry => ({
  colors: Array.isArray(industry)
    ? industry.map(x => GRADIENT_COLORS[x])
    : [GRADIENT_COLORS[industry]],
  baseColor: GRADIENT_COLORS.BASE,
});

export const generateCourseCard = data => {
  let status = null;

  if (data.completed === false) {
    status = { label: 'Ongoing', variant: 'ongoing' };
  } else if (data.completed === true) {
    status = { label: 'Completed', variant: 'pass' };
  } else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2) {
    status = { label: 'New', variant: 'new' };
  }

  return {
    title: data.title,
    description: data.description || '',

    industry: data.category,
    time: data.duration,

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

export const generateAssessmentCard = data => {
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
        action = data.resubmitted ? 'View' : 'Resubmit';
        status = { label: 'Try again', variant: 'fail' };
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
  // Otherwise, mark as new
  else if (moment().diff(data.createdAt.toDate(), 'weeks') < 2) {
    status = { label: 'New', variant: 'new' };
  }

  return {
    title: data.title,

    industry: data.category,
    time: data.duration,

    description: data.briefing || '',

    status,

    media: { type: 'image', src: data.image && data.image.url },
    icon: 'industry',

    route: `${ROUTES.ASSESSMENT}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,
    action,
  };
};

export const generateJobCard = data => {
  let status = null;
  let action = 'Learn more';

  const diffDays = -1 * moment().diff(data.closingDate.toDate(), 'days');

  // From users/jobs subcollection
  if (data.jobId) {
    status = { label: 'Applied', variant: 'submitted' };
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
    title: data.title,

    industry: data.industry,
    time: moment(data.closingDate.toDate()).format('D MMMM'),

    description: data.companyDescription || '',

    skills: data.skillsRequired,
    skillsHeader: 'Required',

    status,

    icon: data.image && data.image.url,

    route: `${ROUTES.JOB}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,
    action,
  };
};
