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
    label: { fontWeight: 500 },
  })
);

interface IAssessmentOutcomeProps {
  assessmentData: DocWithId<UsersAssessmentsDoc>;
}

const AssessmentOutcome: React.FunctionComponent<IAssessmentOutcomeProps> = ({
  assessmentData,
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
      outcomeLabel = 'Try Again';
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
