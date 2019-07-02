import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import UserContext from 'contexts/UserContext';
import { CARD_COLS_WIDTHS, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

import AssessmentCards from 'components/Dashboard/AssessmentCards';
import JobCards from 'components/Dashboard/JobCards';
import CourseCards from 'components/Dashboard/CourseCards';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

    margin: '0 auto', // Horizontally center

    // Fix width to width of card columns
    maxWidth: 'none',
    [CARD_COLS_MEDIA_QUERIES[1]]: { maxWidth: CARD_COLS_WIDTHS[1] },
    [CARD_COLS_MEDIA_QUERIES[2]]: { maxWidth: CARD_COLS_WIDTHS[2] },
    [CARD_COLS_MEDIA_QUERIES[3]]: { maxWidth: CARD_COLS_WIDTHS[3] },
    [CARD_COLS_MEDIA_QUERIES[4]]: { maxWidth: CARD_COLS_WIDTHS[4] },
    [CARD_COLS_MEDIA_QUERIES[5]]: { maxWidth: CARD_COLS_WIDTHS[5] },
  },

  greeting: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(3),

    userSelect: 'none',
  },
}));

const DashboardContainer = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Dashboard – 2hats';
  }, []);

  return (
    <main className={classes.root}>
      <Typography
        variant="button"
        color="textSecondary"
        className={classes.greeting}
        component="p"
      >
        Hi {user.firstName}!
      </Typography>
      <AssessmentCards />
      <JobCards />
      <CourseCards />
    </main>
  );
};

export default DashboardContainer;
