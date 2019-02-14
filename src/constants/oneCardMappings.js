import React from 'react';
import moment from 'moment';

import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlined';

import CourseDetail from '../components/Cards/CourseDetail';
import AssessmentDetail from '../components/Cards/AssessmentDetail';
import JobDetail from '../components/Cards/JobDetail';

import * as ROUTES from './routes';

export const course = data => {
  let banner = null;
  let bannerColor = '';

  if (data.completed === false) {
    banner = (
      <>
        <FailedIcon />
        Incomplete
      </>
    );
    bannerColor = 'orange';
  } else if (data.completed === true) {
    banner = (
      <>
        <CompletedIcon />
        Completed
      </>
    );
    bannerColor = 'green';
  }

  return {
    title: data.title,
    secondaryText: <CourseDetail data={data} />,
    primaryAction: data.hasOwnProperty('completed')
      ? data.completed
        ? 'View'
        : 'Continue'
      : 'Get started',
    route: `${ROUTES.COURSE_REDIRECT}?id=${data.LWid}`,
    newTab: true,

    banner,
    bannerColor,

    video: data.videoUrl,
  };
};

export const assessment = data => {
  let primaryAction = 'Get started';
  let banner = null;
  let bannerColor = '';

  if (data.assessmentId) {
    if (!data.submitted) {
      primaryAction = 'Complete submission';

      banner = (
        <>
          <FailedIcon />
          Incomplete
        </>
      );
      bannerColor = 'orange';
    } else {
      if (data.outcome === 'pass') {
        primaryAction = 'View submission';

        banner = (
          <>
            <PassedIcon />
            Passed
          </>
        );
        bannerColor = 'green';
      } else if (data.outcome === 'fail') {
        primaryAction = data.resubmitted ? 'View' : 'Resubmit';

        banner = (
          <>
            <FailedIcon />
            Failed
          </>
        );
        bannerColor = 'red';
      } else {
        // Submitted but no outcome yet/not screened
        primaryAction = 'View submission';
        banner = (
          <>
            <SubmittedIcon />
            Submitted
          </>
        );
      }
    }
  }

  return {
    title: data.title,
    secondaryText: <AssessmentDetail data={data} />,
    primaryAction,
    route: `${ROUTES.ASSESSMENTS}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,

    banner,
    bannerColor,

    image: data.image && data.image.url,
  };
};

export const job = data => {
  let banner = null;
  let bannerColor = '';

  if (data.jobId)
    banner = (
      <>
        <SubmittedIcon />
        Applied
      </>
    );
  if (moment(data.closingDate, 'DD/MM/YYYY').diff(moment(), 'days') < 0) {
    banner = (
      <>
        <FailedIcon />
        Applications Closed
      </>
    );
  } else if (
    moment(data.closingDate, 'DD/MM/YYYY').diff(moment(), 'days') < 3
  ) {
    banner = (
      <>
        <FailedIcon />
        Closing Soon
      </>
    );
    bannerColor = 'orange';
  }

  return {
    title: data.title,
    secondaryText: <JobDetail data={data} />,
    primaryAction: data.jobId ? 'View' : 'Learn more',
    route: `${ROUTES.JOBS}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,

    banner,
    bannerColor,

    image: data.image && data.image.url,
  };
};

export const event = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Do the thing',
  route: `${ROUTES.EVENTS}?id=${data.id}`,

  tertiaryText: [`Starts ${data.startDateTime}`, `Ends ${data.endDateTime}`],

  image: data.image && data.image.url,
});
