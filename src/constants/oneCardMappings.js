import React from 'react';

import JobsIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentsIcon from '@material-ui/icons/AssignmentRounded';
import CoursesIcon from '@material-ui/icons/SchoolRounded';
import EventsIcon from '@material-ui/icons/EventRounded';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import CheckIcon from '@material-ui/icons/CheckCircleRounded';
import FailedIcon from '@material-ui/icons/ErrorRounded';

import * as ROUTES from './routes';

export const course = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Get started',
  route: `${ROUTES.COURSE_REDIRECT}?id=${data.id}`,

  newTab: true,
  indicator: <CoursesIcon />,
  tertiaryText: [data.duration, ...data.skillsAssociated],

  video: data.videoUrl,
});

export const assessment = data => {
  let primaryAction = 'Get started';
  let tertiaryIndicator = null;

  if (data.assessmentId) {
    if (!data.submitted) {
      primaryAction = 'Complete submission';
      tertiaryIndicator = (
        <>
          Incomplete <FailedIcon />
        </>
      );
    } else {
      if (data.outcome === 'pass') {
        primaryAction = 'View submission';
        tertiaryIndicator = (
          <>
            Passed <CheckIcon />
          </>
        );
      } else if (data.outcome === 'fail') {
        primaryAction = 'Resubmit';
        tertiaryIndicator = (
          <>
            Failed <FailedIcon />
          </>
        );
      } else {
        // Submitted but no outcome yet/not screened
        primaryAction = 'View submission';
        tertiaryIndicator = (
          <>
            Submitted <SubmittedIcon />
          </>
        );
      }
    }
  }

  return {
    title: data.title,
    secondaryText: data.description,
    primaryAction,
    route: `${ROUTES.ASSESSMENTS}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,

    indicator: <AssessmentsIcon />,
    tertiaryText: [
      `${data.duration} minutes`,
      `Skill: ${data.skillAssociated}`,
      ...data.links,
    ],

    tertiaryIndicator,

    image: data.image && data.image.url,
  };
};

export const job = data => ({
  title: data.title,
  primaryAction: data.jobId ? 'View' : 'Learn more',
  route: `${ROUTES.JOBS}?id=${data.id}${data.yours ? '&yours=true' : ''}`,

  indicator: <JobsIcon />,
  tertiaryText: [
    `Closing ${data.closingDate}`,
    `Industry: ${data.industry}`,
    `Pay: ${data.payRate}/${data.payUnits}`,
  ],

  tertiaryIndicator: data.jobId && (
    <>
      Applied <SubmittedIcon />
    </>
  ),

  image: data.image && data.image.url,
});

export const event = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Do the thing',
  route: `${ROUTES.EVENTS}?id=${data.id}`,

  indicator: <EventsIcon />,
  tertiaryText: [`Starts ${data.startDateTime}`, `Ends ${data.endDateTime}`],

  image: data.image && data.image.url,
});
