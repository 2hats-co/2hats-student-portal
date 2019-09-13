import React from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';
import DisqualifyIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';

import { DocWithId, UsersAssessmentsDoc } from '@bit/twohats.common.db-types';

const useStyles = makeStyles(theme =>
  createStyles({
    icon: { marginRight: theme.spacing(1) },

    label: {
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: theme.typography.overline.letterSpacing,
    },
  })
);

interface IAssessmentOutcomeProps {
  assessmentData: DocWithId<UsersAssessmentsDoc>;
  /** The number of submissions the user can still make */
  submissionsRemaining: number;
}

/**
 * Displays the user’s outcome with icon and label.
 */
const AssessmentOutcome: React.FunctionComponent<IAssessmentOutcomeProps> = ({
  assessmentData,
  submissionsRemaining,
}) => {
  const classes = useStyles();

  let outcomeIcon: React.ReactNode = null;
  let outcomeLabel: React.ReactNode = null;
  switch (assessmentData.outcome) {
    case 'pass':
      outcomeIcon = (
        <PassIcon className={classes.icon} htmlColor={green[500]} />
      );
      outcomeLabel = 'Passed';
      break;
    case 'fail':
      outcomeIcon = <FailIcon className={classes.icon} htmlColor={red[500]} />;
      // Display Try Again if they can still make submissions
      outcomeLabel = submissionsRemaining > 0 ? 'Try Again' : 'Unsuccessful';
      break;
    case 'disqualify':
      outcomeIcon = <DisqualifyIcon className={classes.icon} />;
      outcomeLabel = 'Unsuccessful';
      break;

    default:
      break;
  }

  return (
    <Grid container alignItems="center">
      {outcomeIcon}
      <Typography variant="subtitle1" component="h3" className={classes.label}>
        {outcomeLabel}
      </Typography>
    </Grid>
  );
};

export default AssessmentOutcome;
