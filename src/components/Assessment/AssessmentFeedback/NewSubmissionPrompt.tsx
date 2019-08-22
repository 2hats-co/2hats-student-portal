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

import { copyAssessmentForResubmission } from 'utilities/assessments';
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
}

/**
 * Shows either a resubmission prompt or a link to the new submission made
 * from this one.
 */
const NewSubmissionPrompt: React.FunctionComponent<
  INewSubmissionPromptProps
> = ({ assessmentData, history }) => {
  const classes = useStyles();
  const { user } = useUser();

  // Loading state for resubmission
  const [loading, setLoading] = useState(false);
  if (loading) return <LoadingScreen message="Creating submission…" />;

  if (assessmentData.resubmitted)
    return (
      <section className={classes.root}>
        <Divider className={classes.divider} />
        <Typography variant="body1" gutterBottom>
          This feedback is for an old submission.
          <br />
          You’ve already made a new submission.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={`${ROUTES.ASSESSMENT}?id=${
            assessmentData.resubmitted
          }&yours=true`}
        >
          View Submission
          <GoIcon />
        </Button>
      </section>
    );

  return (
    <section className={classes.root}>
      <Divider className={classes.divider} />
      <Typography variant="body1" gutterBottom>
        You can make one more submission.
      </Typography>
      <Button
        onClick={() => {
          setLoading(true);
          copyAssessmentForResubmission(assessmentData, user, history);
        }}
        variant="contained"
        color="primary"
        size="large"
      >
        Resubmit
        <GoIcon />
      </Button>
    </section>
  );
};

export default withRouter(NewSubmissionPrompt);
