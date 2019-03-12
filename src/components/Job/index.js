import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import BackButton from '../ContainerHeader/BackButton';
import JobMetadata from './JobMetadata';
import JobApply from './JobApply';
import SkillItem from '../SkillItem';
import Form from '../Form';

import jobApplicationFields from '../../constants/forms/jobApplication';
import * as ROUTES from '../../constants/routes';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from '../../hooks/useDocument';
import { createDoc, updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  skillsWrapper: {
    marginTop: -theme.spacing.unit / 2,
    marginLeft: -theme.spacing.unit / 2,
  },
  upskill: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,

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
  applyBigWrapper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 5,
  },

  formHeaderGrid: { marginBottom: theme.spacing.unit },
});

const Job = props => {
  const { classes, theme, data, user, history } = props;

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileState, profileDispatch] = useDocument();
  const profile = profileState.doc;

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const showApply = () => {
    setShowDialog(true);
    if (!profileState.path) {
      profileDispatch({ path: `${COLLECTIONS.profiles}/${user.id}` });
      setLoading(true);
    }
  };

  useEffect(
    () => {
      if (profile) setLoading(false);
    },
    [profile]
  );

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
        console.log('Created job application doc', docRef.id);

        const newTouchedJobs = user.touchedJobs || [];
        newTouchedJobs.push(data.id);
        updateDoc(COLLECTIONS.users, user.id, {
          touchedJobs: newTouchedJobs,
        });

        history.push(`${ROUTES.JOB}?id=${docRef.id}&yours=true`);
      });
    }
  };

  const skillsNotAchieved = user.skills ? [] : [...data.skillsRequired];
  data.skillsRequired.forEach(x => {
    if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
  });

  return (
    <div className={classes.root}>
      <BackButton
        className={classes.backButton}
        route={ROUTES.JOBS}
        label="Jobs"
      />

      <main className={classes.content}>
        {data.image && data.image.url ? (
          <div
            style={{ backgroundImage: `url(${data.image.url})` }}
            className={classes.coverImage}
          />
        ) : (
          <div style={{ height: 24 }} />
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
          <JobApply
            onClick={showApply}
            data={data}
            skillsNotAchieved={skillsNotAchieved}
            loading={loading}
          />
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
              <SkillItem key={`${i}-${x}`} value={x} clickable />
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
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.companyDescription }}
          />
        </div>

        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            Job description
          </Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.jobDescription }}
          />
        </div>

        <div className={classNames(classes.section, classes.applyBigWrapper)}>
          <JobApply
            onClick={showApply}
            data={data}
            skillsNotAchieved={skillsNotAchieved}
            loading={loading}
            big
          />
        </div>
      </main>

      <Form
        action="apply"
        actions={{
          apply: data => {
            applyForJob(data);
            updateDoc(COLLECTIONS.profiles, user.id, { resume: data.resume });
            setShowDialog(false);
          },
          close: () => {
            setShowDialog(false);
          },
        }}
        open={!!(showDialog && profile)}
        data={jobApplicationFields({
          'pay-calcVal': data.payRate,
          'pay-units': data.payUnits,
          resume: profile && profile.resume,
          workRestriction: profile && profile.workRestriction,
        })}
        formTitle={`for ${data.title}`}
        formHeader={
          <div style={{ marginBottom: 32 }}>
            <JobMetadata data={data} isXs={isXs} />
          </div>
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
