import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import InfoIcon from '@material-ui/icons/InfoOutlined';

import BackButton from '../ContainerHeader/BackButton';
import JobMetadata from './JobMetadata';
import JobApply from './JobApply';
import SkillItem from '../SkillItem';
import Form from '../Form';
import SkillsCounter from './SkillsCounter';

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2,

    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadowsLight[12],

    userSelect: 'none',
  },
  upskillIcon: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit / 4,
    color: theme.palette.primary.main,
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

  coverImage: {
    ...STYLES.DETAIL_VIEW(theme).coverImage,
    maxWidth: 160,
  },
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

  const skillsNotAchieved = user.skills
    ? []
    : data.skillsRequired.map(x => x.id);
  data.skillsRequired
    .map(x => x.id)
    .forEach(x => {
      if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
    });

  return (
    <div className={classes.root}>
      <BackButton className={classes.backButton} />

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
          {skillsNotAchieved.length > 0 && (
            <Grid
              container
              className={classes.upskill}
              wrap="nowrap"
              alignItems="flex-start"
            >
              <Grid item>
                <InfoIcon className={classes.upskillIcon} />
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" color="primary">
                  You need {skillsNotAchieved.length} more of the skills below
                  to apply.
                </Typography>
                <Typography variant="body1">
                  To demonstrate your skills to potential employers, complete
                  the short online tasks listed below. Click on a skill below to
                  get started.
                </Typography>
              </Grid>
            </Grid>
          )}

          <Typography variant="h6" gutterBottom>
            Skills required
            <SkillsCounter
              skillsNotAchieved={skillsNotAchieved}
              skillsRequired={data.skillsRequired}
            />
          </Typography>

          <div className={classes.skillsWrapper}>
            {data.skillsRequired.map((x, i) => (
              <SkillItem key={`${i}-${x}`} value={x} clickable />
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            About the company
          </Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.companyDescription }}
          />
        </div>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
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
