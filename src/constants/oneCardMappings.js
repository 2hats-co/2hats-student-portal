import React from 'react';
import moment from 'moment';

import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import SkillItem from '../components/SkillItem';

import * as ROUTES from './routes';
import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const CourseDetail = withTheme()(({ data, theme }) => (
  <>
    <Typography
      component="p"
      style={{ whiteSpace: 'pre-wrap' }}
      color="textSecondary"
    >
      {data.description}
    </Typography>

    <Typography
      variant="subtitle2"
      style={{ marginTop: theme.spacing.unit * 2 }}
    >
      Skills taught
    </Typography>
    <div
      style={{
        marginLeft: -theme.spacing.unit / 4,
      }}
    >
      {data.skillsAssociated.slice(0, 3).map((x, i) => (
        <SkillItem key={`${i}-${x}`} value={x} dense />
      ))}
      {data.skillsAssociated.length > 3 && (
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
          +{data.skillsAssociated.length - 3} more
        </Typography>
      )}
    </div>

    <Grid
      container
      alignItems="center"
      style={{
        width: 'auto',
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
      }}
    >
      <Grid item>
        <IndustryIcon
          style={{
            marginRight: theme.spacing.unit,
            color: theme.palette.text.secondary,
          }}
        />
      </Grid>
      <Grid item xs>
        <Typography variant="body1">
          {getAssessmentCategoryLabel(data.category)}
        </Typography>
      </Grid>
    </Grid>

    <Grid
      container
      alignItems="flex-end"
      style={{ marginTop: theme.spacing.unit / 2 }}
    >
      <TimeIcon
        style={{
          marginRight: theme.spacing.unit,
          color: theme.palette.text.secondary,
        }}
      />
      <Typography variant="body1">{data.duration}</Typography>
    </Grid>
  </>
));
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
        Compleeted
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
    route: `${ROUTES.COURSE_REDIRECT}?id=${data.id}`,
    newTab: true,

    banner,
    bannerColor,

    video: data.videoUrl,
  };
};

const AssessmentDetail = withTheme()(({ data, theme }) => (
  <>
    <Grid
      container
      alignItems="center"
      style={{ width: 'auto', marginTop: theme.spacing.unit / 2 }}
    >
      <Grid item>
        <IndustryIcon
          style={{
            marginRight: theme.spacing.unit / 2,
            color: theme.palette.text.primary,
          }}
        />
      </Grid>
      <Grid item xs>
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: '500 !important',
          }}
        >
          {getAssessmentCategoryLabel(data.category)}
        </Typography>
      </Grid>
    </Grid>

    {/* <Typography
      variant="subtitle2"
      style={{
        marginLeft: theme.spacing.unit / 4,
        marginTop: theme.spacing.unit * 2,
      }}
    >
      Skill awarded
    </Typography>
    <SkillItem value={data.skillAssociated} style={{ marginLeft: 0 }} dense /> */}

    <div
      style={{
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        marginBottom: '-1em',
      }}
      dangerouslySetInnerHTML={{ __html: data.jobDescription }}
    />
  </>
));
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
            color: theme.palette.text.primary,
          }}
        />
      </Grid>
      <Grid item xs>
        <Typography
          variant="subtitle1"
          style={{
            textTransform: 'capitalize',
            fontWeight: '500 !important',
          }}
        >
          {data.industry}
        </Typography>
      </Grid>
    </Grid>

    <div
      style={{
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
      }}
      dangerouslySetInnerHTML={{ __html: data.companyDescription }}
    />

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
