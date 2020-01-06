import React, { useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useUser } from 'contexts/UserContext';

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
      </Grid>

      <AssessmentCards />
      <JobCards />
      <CourseCards />
    </main>
  );
};

export default DashboardContainer;
