import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import BackButton from '../ContainerHeader/BackButton';
import JobMetadata from './JobMetadata';
import SkillItem from '../SkillItem';
import Form from '../Form';

import jobApplicationFields from '../../constants/forms/jobApplication';
import * as ROUTES from '../../constants/routes';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { createDoc, updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  content: {
    maxWidth: 640,
    margin: '0 auto',
  },

  title: {
    fontWeight: 400,
    textAlign: 'center',
  },

  coverImage: {
    borderRadius: theme.shape.borderRadius * 0.75,
    width: '100%',
    height: '100%',

    maxWidth: 480,
    minHeight: 160,

    margin: '0 auto',
    marginBottom: theme.spacing.unit * 3,

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  subtitle: { fontWeight: 700 },

  description: { whiteSpace: 'pre-line' },

  ...STYLES.RENDERED_HTML(theme),

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

  applyWrapper: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  apply: {
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px`,
    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
    },
  },
  applyBig: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
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

  formHeaderGrid: { marginBottom: theme.spacing.unit },
});

const Job = props => {
  const { classes, theme, data, user, history } = props;

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

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
        outcome: 'pending',
        screened: false,
        submissionContent: { ...o },
        jobId: id,
        submitted: true,
      }).then(docRef => {
        console.log('Created submission doc', docRef.id);

        const newTouchedJobs = user.touchedJobs || [];
        newTouchedJobs.push(data.id);
        updateDoc(COLLECTIONS.users, user.id, {
          touchedJobs: newTouchedJobs,
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

      <main className={classes.content}>
        {data.image && data.image.url && (
          <div
            style={{ backgroundImage: `url(${data.image.url})` }}
            className={classes.coverImage}
          />
        )}

        <Typography
          variant={isXs ? 'h5' : 'h4'}
          className={classes.title}
          style={isXs ? { fontWeight: 500 } : {}}
        >
          {data.title}
        </Typography>
        <JobMetadata data={data} isXs={isXs} />

        <div className={classes.applyWrapper}>
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
              You need {skillsNotAchieved.length} more of the required skills to
              apply
            </Typography>
          )}
        </div>

        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            Skills required
          </Typography>
          <div className={classes.skillsWrapper}>
            {data.skillsRequired.map((x, i) => (
              <SkillItem key={`${i}-${x}`} value={x} />
            ))}
          </div>
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
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            About the company
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {data.companyDescription}
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            The role
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {data.roleDescription}
          </Typography>
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
      </main>

      <Form
        action="apply"
        actions={{
          apply: data => {
            applyForJob(data);
            updateDoc(COLLECTIONS.users, user.id, { resume: data.resume });
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
          resume: user.resume,
        })}
        formTitle={`for ${data.title}`}
        formHeader={
          <Grid container spacing={24} className={classes.formHeaderGrid}>
            <Grid item xs={12} sm={5}>
              <div
                style={{ backgroundImage: `url(${data.image.url})` }}
                className={classes.coverImage}
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <JobMetadata data={data} />
            </Grid>
          </Grid>
        }
      />
    </div>
  );
};

Job.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(Job));
