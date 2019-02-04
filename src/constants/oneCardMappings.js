import React from 'react';

import Typography from '@material-ui/core/Typography';

import JobsIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentsIcon from '@material-ui/icons/AssignmentRounded';
import CoursesIcon from '@material-ui/icons/SchoolRounded';
import EventsIcon from '@material-ui/icons/EventRounded';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '@material-ui/icons/CheckCircleRounded';
import FailedIcon from '@material-ui/icons/ErrorRounded';

import CourseMetadata from '../components/Course/CourseMetadata';
import AssessmentMetadata from '../components/Assessment/AssessmentMetadata';
import JobMetadata from '../components/Job/JobMetadata';

import * as ROUTES from './routes';

export const course = data => ({
  title: data.title,
  secondaryText: (
    <>
      <Typography component="p" style={{ whiteSpace: 'pre-wrap' }}>
        {data.description}
      </Typography>
      <CourseMetadata data={data} style={{ marginTop: 16 }} />
    </>
  ),
  primaryAction: data.hasOwnProperty('hasCompleted')
    ? data.hasCompleted
      ? 'View'
      : 'Continue'
    : 'Get started',
  route: `${ROUTES.COURSE_REDIRECT}?id=${data.id}`,

  newTab: true,
  indicator: <CoursesIcon />,

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
            Passed <PassedIcon />
          </>
        );
      } else if (data.outcome === 'fail') {
        primaryAction = data.resubmitted ? 'View' : 'Resubmit';
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
    secondaryText: <AssessmentMetadata data={data} />,
    primaryAction,
    route: `${ROUTES.ASSESSMENTS}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,

    indicator: <AssessmentsIcon />,

    tertiaryIndicator,

    image: data.image && data.image.url,
  };
};

export const job = data => ({
  title: data.title,
  secondaryText: <JobMetadata data={data} small />,
  primaryAction: data.jobId ? 'View' : 'Learn more',
  route: `${ROUTES.JOBS}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,

  indicator: <JobsIcon />,

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
