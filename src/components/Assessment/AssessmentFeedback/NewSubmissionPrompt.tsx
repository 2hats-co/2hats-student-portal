import React, { useState } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import GoIcon from '@bit/twohats.common.icons.go';

import LoadingScreen from 'components/LoadingScreen';

import {
  copyAssessmentForResubmission,
  MAX_ASSESSMENT_ATTEMPTS,
  ASSESSMENT_ATTEMPT_PERIOD_MONTHS,
} from 'utilities/assessments';
import * as ROUTES from 'constants/routes';
import { DocWithId, UsersAssessmentsDoc } from '@bit/twohats.common.db-types';
import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    },

    divider: { margin: theme.spacing(3, 0) },
  })
);

interface INewSubmissionPromptProps extends RouteComponentProps {
  assessmentData: DocWithId<UsersAssessmentsDoc>;
  allSubmissions: DocWithId<UsersAssessmentsDoc>[];
  submissionsRemaining: number;
}

/**
 * Shows either a resubmission prompt or a link to the new submission made
 * from this one.
 */
const NewSubmissionPrompt: React.FunctionComponent<
  INewSubmissionPromptProps
> = ({ assessmentData, history, allSubmissions, submissionsRemaining }) => {
  const classes = useStyles();
  const { user } = useUser();

  const otherSubmissions = allSubmissions.filter(
    submissionDoc => submissionDoc.id !== assessmentData.id
  );

  // Loading state for resubmission
  const [loading, setLoading] = useState(false);
  if (loading) return <LoadingScreen message="Creating submission…" />;

  // If resubmitted, link to the latest submission
  if (assessmentData.resubmitted && otherSubmissions.length > 1) {
    return (
      <section className={classes.root}>
        <Divider className={classes.divider} />
        <Typography variant="body1" paragraph>
          This feedback is for an old submission.
          <br />
          You’ve already made a new submission.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={`${ROUTES.ASSESSMENT}/${otherSubmissions[0].id}?yours=true`}
        >
          View Submission
          <GoIcon />
        </Button>
      </section>
    );
  }

  // Otherwise, check if they can resubmit
  // (less than 3 submissions in the last 6 months AND not disableSubmissions)
  let message: React.ReactNode;
  if (submissionsRemaining > 0)
    message = (
      <>
        <Typography variant="body1" paragraph>
          You can make up to {submissionsRemaining} more attempt
          {submissionsRemaining !== 1 && 's'}.
        </Typography>
        <Typography variant="body1" paragraph>
          Please note you only have up to {MAX_ASSESSMENT_ATTEMPTS} attempts
          within a {ASSESSMENT_ATTEMPT_PERIOD_MONTHS} month time period.
        </Typography>
      </>
    );
  else
    message = (
      <>
        <Typography variant="body1" paragraph>
          You have no attempts remaining.
        </Typography>

        <Typography variant="body1" paragraph>
          Please take the time to read the feedback above and check out{' '}
          <Link to={ROUTES.COURSES}>our courses</Link> for further guidance.
        </Typography>

        <Typography variant="body1" paragraph>
          You can make a new attempt in {ASSESSMENT_ATTEMPT_PERIOD_MONTHS}{' '}
          months.
        </Typography>
      </>
    );

  return (
    <section className={classes.root}>
      <Divider className={classes.divider} />

      {message}

      <Button
        onClick={() => {
          setLoading(true);
          copyAssessmentForResubmission(assessmentData, user, history);
        }}
        variant="contained"
        color="primary"
        size="large"
        disabled={submissionsRemaining <= 0}
      >
        Resubmit
        <GoIcon />
      </Button>
    </section>
  );
};

export default withRouter(NewSubmissionPrompt);
