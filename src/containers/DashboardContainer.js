import React, { useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useUser } from 'contexts/UserContext';
import { CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

import CTDashboardButton from 'components/CuriousThing/CTDashboardButton';
import AssessmentCards from 'components/Dashboard/AssessmentCards';
import JobCards from 'components/Dashboard/JobCards';
import CourseCards from 'components/Dashboard/CourseCards';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto', // Horizontally center
  },

  greetingBar: {
    padding: theme.spacing(0, 1),
    margin: '0 auto',
    marginBottom: theme.spacing(3),

    userSelect: 'none',
  },
  curiousThingButton: {
    // Full width on single-column size
    marginTop: theme.spacing(1),
    width: '100%',
    // Unset for 2+ columns
    [CARD_COLS_MEDIA_QUERIES[2]]: {
      marginTop: 0,
      width: 'auto',
    },
  },
}));

const DashboardContainer = () => {
  const classes = useStyles();
  const { user } = useUser();

  useEffect(() => {
    document.title = 'Dashboard – 2hats';
  }, []);

  return (
    <main className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={clsx(classes.greetingBar, 'width-fixed-cards-cols')}
      >
        <Typography variant="button" color="textSecondary" component="p">
          Hi {user.firstName}!
        </Typography>

        <CTDashboardButton className={classes.curiousThingButton} />
      </Grid>

      <AssessmentCards />
      <JobCards />
      <CourseCards />
    </main>
  );
};

export default DashboardContainer;
