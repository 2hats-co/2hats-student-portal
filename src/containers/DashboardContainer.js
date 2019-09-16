import React, { useEffect } from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useUser } from 'contexts/UserContext';
import { CARD_COLS_WIDTHS, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

import CTDashboardButton from 'components/CuriousThing/CTDashboardButton';
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

  greetingBar: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(3),

    userSelect: 'none',
  },
  curiousThingButton: {
    [theme.breakpoints.up('md')]: { marginRight: theme.spacing(-2) },

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
        className={classes.greetingBar}
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
