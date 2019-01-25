import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import PayIcon from '@material-ui/icons/AttachMoneyRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import EventIcon from '@material-ui/icons/EventRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';
import CheckIcon from '@material-ui/icons/CheckRounded';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import BackButton from '../ContainerHeader/BackButton';
import SkillItem from './SkillItem';
import Form from '../Form';
import jobApplicationFields from '../../constants/forms/jobApplication';
import * as ROUTES from '../../constants/routes';
import { COLLECTIONS } from '../../constants/firestore';
import { createDoc, updateProperties } from '../../utilities/firestore';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    maxWidth: 720,
    margin: '0 auto',
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },

  coverImage: {
    borderRadius: theme.shape.borderRadius / 2,
    maxWidth: '100%',
    height: '100%',
    minHeight: theme.spacing.unit * 15,

    marginBottom: theme.spacing.unit * 3,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  title: { fontWeight: 500 },
  subtitle: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,

    '& $adornmentIcon': {
      verticalAlign: 'sub',
      color: theme.palette.primary.main,
    },
  },
  meta: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  adornmentIcon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  skillsWrapper: {
    marginTop: theme.spacing.unit / 2,
    // marginBottom: -theme.spacing.unit * 2,
  },
  skillWrapper: {
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  upskill: {
    '& svg': {
      verticalAlign: 'bottom',
      marginLeft: theme.spacing.unit / 2,
    },
    '& > svg': {
      marginLeft: 0,
      marginRight: theme.spacing.unit,
    },
  },

  apply: {
    marginTop: theme.spacing.unit * 2,
    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
    },
  },
  applyBig: {
    width: '100%',
    display: 'flex',
    // padding: theme.spacing.unit * 1.5,

    fontSize: theme.spacing.unit * 3,
    fontWeight: 500,
    borderRadius: 200,
    transition: theme.transitions.create(['transform', 'box-shadow']),

    '& svg': {
      fontSize: theme.spacing.unit * 3.75,
      marginLeft: theme.spacing.unit,
      marginRight: -theme.spacing.unit,
      position: 'relative',
      top: theme.spacing.unit / 4,
    },
  },

  skillsWarning: {
    marginTop: theme.spacing.unit,
    color: theme.palette.error.main,

    '& svg': {
      verticalAlign: 'bottom',
      marginRight: theme.spacing.unit / 2,
    },
    '$applyBig + &': { textAlign: 'center' },
  },

  loading: {
    position: 'absolute',
    '& svg': {
      margin: 0,
      position: 'static',
    },
  },
});

const Job = props => {
  const { classes, data, user, history } = props;

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(false);
    },
    [data]
  );

  const applyForJob = o => {
    if (!data.jobId) {
      const { id, ...rest } = data;
      setLoading(true);
      createDoc(`${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`, {
        ...rest,
        UID: user.id,
        outcome: '',
        screened: false,
        submissionContent: { ...o },
        jobId: id,
        submitted: true,
      }).then(docRef => {
        console.log('Created submission doc', docRef.id);

        const newTouchedJobs = user.touchedJobs || [];
        newTouchedJobs.push(data.id);
        updateProperties(COLLECTIONS.users, user.id, {
          touchedAssessments: newTouchedJobs,
        });

        history.push(`${ROUTES.JOBS}?id=${docRef.id}&yours=true`);
        // setSubmissionId(docRef.id);
      });
    }
  };

  const skillsNotAchieved = user.skills ? [] : [...data.skillsRequired];
  data.skillsRequired.forEach(x => {
    if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
  });

  return (
    <div className={classes.root}>
      <BackButton className={classes.backButton} />

      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={5}>
            <div
              style={{ backgroundImage: `url(${data.image.url})` }}
              className={classes.coverImage}
            />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Typography variant="h5" className={classes.title}>
              {data.title}
            </Typography>

            <Typography variant="subtitle1" className={classes.subtitle}>
              <IndustryIcon className={classes.adornmentIcon} />
              {data.industry}
            </Typography>

            <Typography variant="body1" className={classes.meta}>
              <TimeIcon className={classes.adornmentIcon} />
              {data.commitment}
            </Typography>
            <Typography variant="body1" className={classes.meta}>
              <PayIcon className={classes.adornmentIcon} />
              {data.payRate}/{data.payUnits}
            </Typography>
            <Typography variant="body1" className={classes.meta}>
              <EventIcon className={classes.adornmentIcon} />
              Closing {data.closingDate}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              className={classNames(
                classes.apply,
                classes.getStartedSection,
                showDialog && classes.gotStarted
              )}
              onClick={e => {
                setShowDialog(true);
              }}
              disabled={skillsNotAchieved.length > 0 || !!data.jobId || loading}
            >
              {loading && (
                <CircularProgress className={classes.loading} size={32} />
              )}
              {data.jobId ? (
                <>
                  Applied
                  <CheckIcon />
                </>
              ) : (
                <>
                  Apply
                  <ArrowForwardIcon />
                </>
              )}
            </Button>
            {skillsNotAchieved.length > 0 && (
              <Typography variant="body2" className={classes.skillsWarning}>
                <ErrorIcon />
                You need {skillsNotAchieved.length} more of the required skills
                to apply
              </Typography>
            )}
          </Grid>
        </Grid>

        <div className={classes.section}>
          <Typography variant="subtitle1">Skills required</Typography>
          <Grid container className={classes.skillsWrapper}>
            {data.skillsRequired.map((x, i) => (
              <Grid
                key={`${i}-${x}`}
                item
                xs={12}
                sm={4}
                className={classes.skillWrapper}
              >
                <SkillItem
                  value={x}
                  achieved={user.skills && user.skills.includes(x)}
                />
              </Grid>
            ))}
          </Grid>
          {skillsNotAchieved.length > 0 && (
            <Typography variant="body1" className={classes.upskill}>
              <InfoIcon />
              Get your skills approved through our{' '}
              <Link href={ROUTES.ASSESSMENTS} target="_blank" rel="noopener">
                Assessments
                <ArrowForwardIcon />
              </Link>
            </Typography>
          )}
        </div>

        <div className={classes.section}>
          <Typography variant="subtitle1">About the company</Typography>
          <Typography variant="body2">{data.companyDescription}</Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="subtitle1">The role</Typography>
          <Typography variant="body2">{data.roleDescription}</Typography>
        </div>

        <div
          className={classNames(
            classes.section,
            classes.getStartedSection,
            showDialog && classes.gotStarted
          )}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.applyBig}
            onClick={e => {
              setShowDialog(true);
            }}
            disabled={skillsNotAchieved.length > 0 || !!data.jobId || loading}
          >
            {loading && (
              <CircularProgress className={classes.loading} size={48} />
            )}
            {data.jobId ? (
              <>
                Applied
                <CheckIcon />
              </>
            ) : (
              <>
                Apply
                <ArrowForwardIcon />
              </>
            )}
          </Button>
          {skillsNotAchieved.length > 0 && (
            <Typography variant="body2" className={classes.skillsWarning}>
              <ErrorIcon />
              You need {skillsNotAchieved.length} more of the required skills to
              apply
            </Typography>
          )}
        </div>

        <Form
          action="apply"
          actions={{
            apply: data => {
              applyForJob(data);
              setShowDialog(false);
            },
            close: () => {
              setShowDialog(false);
            },
          }}
          open={showDialog}
          data={jobApplicationFields({
            'pay-calcVal': data.payRate,
            'pay-units': data.payUnits,
          })}
          formTitle={`for ${data.title}`}
          formHeader={
            <Grid container spacing={24}>
              <Grid item xs={12} sm={5}>
                <div
                  style={{ backgroundImage: `url(${data.image.url})` }}
                  className={classes.coverImage}
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  <IndustryIcon className={classes.adornmentIcon} />
                  {data.industry}
                </Typography>

                <Typography variant="body1" className={classes.meta}>
                  <TimeIcon className={classes.adornmentIcon} />
                  {data.commitment}
                </Typography>
                <Typography variant="body1" className={classes.meta}>
                  <PayIcon className={classes.adornmentIcon} />
                  {data.payRate}/{data.payUnits}
                </Typography>
                <Typography variant="body1" className={classes.meta}>
                  <EventIcon className={classes.adornmentIcon} />
                  Closing {data.closingDate}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </Paper>
    </div>
  );
};

Job.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Job));
