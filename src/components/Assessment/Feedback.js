import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import GoIcon from '@material-ui/icons/ArrowForward';
import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { copyAssessmentForResubmission } from '../../utilities/assessments';
import LoadingScreen from '../LoadingScreen';
import UserContext from '../../contexts/UserContext';
import * as ROUTES from '../../constants/routes';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  resubmittedLink: { verticalAlign: 'baseline' },

  feedbackItem: { marginTop: theme.spacing(2) },
  feedbackIcon: {
    display: 'inline-block',
    marginLeft: -theme.spacing(1) * 4,
    marginTop: 2,
    float: 'left',
  },
  passIcon: { color: green[500] },
  failIcon: { color: red[500] },

  renderedHtml: {
    ...STYLES.RENDERED_HTML(theme).renderedHtml,
    ...theme.typography.body2,
  },
});

const FeedbackItem = withStyles(styles)(({ classes, data }) => (
  <div className={classes.feedbackItem}>
    {data.id &&
      (data.outcome === 'pass' ? (
        <PassIcon className={clsx(classes.feedbackIcon, classes.passIcon)} />
      ) : (
        <FailIcon className={clsx(classes.feedbackIcon, classes.failIcon)} />
      ))}
    {data.id && <Typography variant="subtitle1">{data.title}</Typography>}
    <div
      className={classes.renderedHtml}
      dangerouslySetInnerHTML={{ __html: data.message }}
    />
  </div>
));

const Feedback = props => {
  const { classes, data, history } = props;

  const validFeedback =
    Array.isArray(data.feedback) && data.feedback.length > 0;

  const [loading, setLoading] = useState(false);

  const userContext = useContext(UserContext);
  const user = userContext.user;

  if (loading) return <LoadingScreen message="Creating submission…" />;

  const newSubmissionButton = !!data.resubmitted ? (
    <>
      <Divider className={classes.divider} />
      <Typography variant="body1">
        This feedback is for an old submission. You’ve already made a{' '}
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            history.push(
              `${ROUTES.ASSESSMENT}?id=${data.resubmitted}&yours=true`
            );
          }}
          className={classes.resubmittedLink}
        >
          new submission
        </Link>
        .
      </Typography>
    </>
  ) : (
    <>
      <Divider className={classes.divider} />
      <Typography variant="body1" gutterBottom>
        You can make one more submission.
      </Typography>
      <Button
        onClick={() => {
          setLoading(true);
          copyAssessmentForResubmission(data, user, history);
        }}
        variant="contained"
        color="primary"
      >
        Resubmit
        <GoIcon />
      </Button>
    </>
  );

  if (!validFeedback && data.outcome === 'pass') return null;

  return (
    <div className={classes.root}>
      {validFeedback && (
        <>
          <Divider className={classes.divider} />
          <Typography variant="h6" gutterBottom>
            Feedback
          </Typography>
          {data.feedback.map((x, i) => (
            <FeedbackItem key={i} data={x} />
          ))}
        </>
      )}
      {data.outcome !== 'pass' && newSubmissionButton}
    </div>
  );
};

export default withRouter(withStyles(styles)(Feedback));
