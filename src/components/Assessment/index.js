import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '@material-ui/icons/CheckCircleRounded';
import FailedIcon from '@material-ui/icons/ErrorRounded';

import { paperView } from '../../constants/commonStyles';
import BackButton from '../ContainerHeader/BackButton';
import AssessmentSubmission from './AssessmentSubmission';
import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';
import SkillItem from '../SkillItem';
import StatusMsg from './StatusMsg';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  ...paperView(theme),

  skill: { marginTop: theme.spacing.unit },

  getStarted: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 200,
    transition: theme.transitions.create(['transform', 'box-shadow']),
    boxShadow: theme.shadows[3],

    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: 0,
    },
  },
  getStartedSection: {
    transition: theme.transitions.create(['transform', 'margin-top']),
    transformOrigin: '0 100%',
  },
  gotStarted: {
    transform: 'scale(0)',
    marginTop: -theme.spacing.unit * 5.5,
  },

  resubmitted: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  resubmittedLink: { verticalAlign: 'baseline' },
});

const Assessment = props => {
  const { classes, data, history } = props;

  const gotStartedCondition =
    data && data.assessmentId && data.outcome !== 'fail';
  const [gotStarted, setGotStarted] = useState(gotStartedCondition);

  useEffect(
    () => {
      if (gotStartedCondition) setGotStarted(true);
      else setGotStarted(false);
    },
    [data]
  );

  let statusMsg = null;
  if (data.submitted && !data.screened) {
    statusMsg = (
      <StatusMsg
        Icon={SubmittedIcon}
        title="Submitted"
        body="We will review your submission shortly to assess your skills."
      />
    );
  }
  if (data.submitted && data.screened) {
    if (data.outcome === 'pass')
      statusMsg = (
        <StatusMsg
          Icon={PassedIcon}
          title="Passed"
          body={`Congratulations! Your ${getAssessmentCategoryLabel(
            data.category
          )} skill is now recognised.`}
        />
      );
    else if (data.outcome === 'fail')
      statusMsg = (
        <StatusMsg
          Icon={FailedIcon}
          title="Failed"
          body={`You can make another submission below.`}
        />
      );
  }

  return (
    <Slide in direction="up">
      <div className={classes.root}>
        <BackButton className={classes.backButton} />

        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={5}>
              <div
                style={
                  data.image && data.image.url
                    ? { backgroundImage: `url(${data.image.url})` }
                    : {}
                }
                className={classes.coverImage}
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography variant="h5" className={classes.title}>
                {data.title}
              </Typography>

              <SkillItem
                value={data.skillAssociated}
                header="Skill assessed"
                className={classes.skill}
              />

              <Grid container alignItems="flex-end" style={{ marginTop: 8 }}>
                <IndustryIcon
                  style={{ marginLeft: 12, marginRight: 20, opacity: 0.67 }}
                />
                <Typography variant="body1">
                  {getAssessmentCategoryLabel(data.category)}
                </Typography>
              </Grid>
              <Grid container alignItems="flex-end" style={{ marginTop: 4 }}>
                <TimeIcon
                  style={{ marginLeft: 12, marginRight: 20, opacity: 0.67 }}
                />
                <Typography variant="body1">{data.duration}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {statusMsg}

          <div className={classes.section}>
            <Typography variant="h6">The company</Typography>
            <div
              className={classes.renderedHtml}
              dangerouslySetInnerHTML={{ __html: data.companyDescription }}
            />
          </div>

          <div className={classes.section}>
            <Typography variant="h6">Your job</Typography>
            <div
              className={classes.renderedHtml}
              dangerouslySetInnerHTML={{ __html: data.jobDescription }}
            />
          </div>
        </Paper>

        <div
          className={classNames(
            classes.section,
            classes.getStartedSection,
            gotStarted && classes.gotStarted
          )}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.getStarted}
            onClick={e => {
              setGotStarted(true);
            }}
            disabled={!!data.resubmitted}
          >
            {data.outcome === 'fail' ? 'Resubmit' : 'Get started'}
            <ArrowForwardIcon />
          </Button>
          {!!data.resubmitted && (
            <Typography variant="body2" className={classes.resubmitted}>
              You have already created a{' '}
              <Link
                component="button"
                variant="body2"
                className={classes.resubmittedLink}
                onClick={() => {
                  history.push(
                    `${ROUTES.ASSESSMENTS}?id=${data.resubmitted}&yours=true`
                  );
                }}
              >
                new submission
              </Link>
              .
            </Typography>
          )}
        </div>

        {gotStarted && <AssessmentSubmission data={data} />}
      </div>
    </Slide>
  );
};

Assessment.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Assessment));
