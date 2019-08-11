import React, { useContext } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';

import GoIcon from '@bit/twohats.common.icons.go';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { JOB_APPLICATION } from 'constants/routes';
import UserContext from 'contexts/UserContext';
import { getSkillsNotAchieved, getCanApply } from 'utilities/jobs';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    },

    messageText: {
      maxWidth: 320,
      marginLeft: 'auto',
      marginRight: 'auto',
      '&:last-of-type': { marginBottom: theme.spacing(4) },
    },
  })
);

interface IApplyButtonProps extends RouteComponentProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

const ApplyButton: React.FunctionComponent<IApplyButtonProps> = ({
  jobData,
  location,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const skillsNotAchieved = getSkillsNotAchieved(user, jobData.skillsRequired);
  const canApply = getCanApply(user, jobData);

  return (
    <div className={classes.root}>
      {!canApply && (
        <>
          <Typography
            variant="h6"
            color="primary"
            gutterBottom
            className={classes.messageText}
          >
            You need {skillsNotAchieved.length} more skill
            {skillsNotAchieved.length !== 1 && 's'} to be able to apply to this
            position.
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            gutterBottom
            className={classes.messageText}
          >
            Completing assessments makes it possible to apply.
          </Typography>
        </>
      )}

      <Button
        color="primary"
        variant="contained"
        size="large"
        component={Link}
        to={{
          ...location,
          pathname: location.pathname + JOB_APPLICATION,
          state: {
            ...location.state,
            // Prevents a second loading screen to show, which
            // will stop DialogPrompt from being properly loaded
            preventDoubleSubmissionCheck: true,
          },
        }}
        disabled={!canApply}
      >
        Apply
        <GoIcon animated={canApply} />
      </Button>
    </div>
  );
};

export default withRouter(ApplyButton);
