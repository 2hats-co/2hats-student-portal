import React from 'react';
import moment from 'moment';

import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';

import CourseMetadata from '../components/Course/CourseMetadata';
import AssessmentMetadata from '../components/Assessment/AssessmentMetadata';
import SkillItem from '../components/SkillItem';

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
  route: `${ROUTES.COURSE_REDIRECT}?id=${data.id}`,

  newTab: true,

  video: data.videoUrl,
});

export const assessment = data => {
  let banner = null;
  let bannerColor = '';

  if (data.assessmentId) {
    if (!data.submitted) {
      banner = (
        <>
          <FailedIcon />
          Incomplete
        </>
      );
      bannerColor = 'orange';
    } else {
      if (data.outcome === 'pass') {
        banner = (
          <>
            <PassedIcon />
            Passed
          </>
        );
        bannerColor = 'green';
      } else if (data.outcome === 'fail') {
        banner = (
          <>
            <FailedIcon />
            Failed
          </>
        );
        bannerColor = 'red';
      } else {
        // Submitted but no outcome yet/not screened
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
    secondaryText: <AssessmentMetadata data={data} />,
    route: `${ROUTES.ASSESSMENTS}?id=${data.id}${
      data.assessmentId ? '&yours=true' : ''
    }`,

    banner,
    bannerColor,

    image: data.image && data.image.url,
  };
};

const JobDetail = withTheme()(({ data, theme }) => (
  <>
    <Grid
      container
      alignItems="center"
      style={{ width: 'auto', marginBottom: theme.spacing.unit }}
    >
      <Grid item>
        <IndustryIcon
          style={{
            marginRight: theme.spacing.unit,
            marginLeft: -theme.spacing.unit / 4,
            color: theme.palette.text.secondary,
          }}
        />
      </Grid>
      <Grid item xs>
        <Typography
          variant="subtitle1"
          style={{
            textTransform: 'capitalize',
            color: theme.palette.text.secondary,
            fontWeight: '500 !important',
          }}
        >
          {data.industry}
        </Typography>
      </Grid>
    </Grid>

    <Typography variant="body2" style={{ marginBottom: theme.spacing.unit }}>
      {
        data.roleDescription
        /* .slice(0, 100)… */
      }
    </Typography>

    <Typography
      variant="subtitle2"
      style={{ marginLeft: theme.spacing.unit / 4 }}
    >
      Skills required
    </Typography>
    <div
      style={{
        marginLeft: -theme.spacing.unit / 4,
      }}
    >
      {data.skillsRequired.slice(0, 3).map((x, i) => (
        <SkillItem key={`${i}-${x}`} value={x} dense />
      ))}
      {data.skillsRequired.length > 3 && (
        <Typography
          variant="body1"
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            margin: theme.spacing.unit / 4,
            fontWeight: 500,

            borderRadius: theme.shape.borderRadius / 2,
            padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit *
              1.5}px`,
            backgroundColor: theme.palette.divider,
          }}
        >
          +{data.skillsRequired.length - 3} more
        </Typography>
      )}
    </div>
  </>
));
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
  if (moment(data.closingDate, 'DD/MM/YYYY').diff(moment(), 'days') < 3) {
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
