import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorIcon from '@material-ui/icons/ErrorOutline';

import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import { updateDoc } from '../utilities/firestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import withNavigation from '../components/withNavigation';
import UserContext from '../contexts/UserContext';

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
    height: '100vh',
    textAlign: 'center',
  },

  message: {
    marginTop: theme.spacing.unit,
  },

  errorIcon: {
    fontSize: 64,
    color: theme.palette.error.main,
  },
});

function CourseRedirectContainer(props) {
  const { classes, location } = props;

  const hasId =
    location.search.indexOf('?id=') > -1 &&
    location.search.replace('?id=', '').length > 0;

  const userContext = useContext(UserContext);
  const user = userContext.user;

  useEffect(() => {
    document.title = '2hats – Courses – Redirecting…';
  }, []);

  if (hasId) {
    if (!user) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <CircularProgress size={64} />
            <Typography variant="h6" className={classes.message}>
              Loading…
            </Typography>
          </Grid>
        </Grid>
      );
    }

    // touch the course
    const parsedQuery = queryString.parse(location.search);
    const courseId = parsedQuery.id;

    if (!user.touchedCourses || !user.touchedCourses.includes(courseId)) {
      const newTouchedCourses = user.touchedCourses || [];
      newTouchedCourses.push(courseId);
      updateDoc(COLLECTIONS.users, user.id, {
        touchedCourses: newTouchedCourses,
      });
    }

    // set user's interest to course so what's next can display the right things
    if (user.interest !== 'course')
      updateDoc(COLLECTIONS.users, user.id, {
        interest: 'course',
      });

    // learnWorlds single sign on
    cloudFunction(
      CLOUD_FUNCTIONS.LW_SINGLE_SIGN_ON,
      { courseId: location.search.replace('?id=', '') },
      res => {
        window.location.href = res.data.url;
      },
      err => {
        console.log(err);
      }
    );

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <CircularProgress size={64} />
          <Typography variant="h6" className={classes.message}>
            Redirecting…
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <ErrorIcon className={classes.errorIcon} />
        <Typography variant="h6" className={classes.message}>
          Invalid course ID
        </Typography>
      </Grid>
    </Grid>
  );
}

CourseRedirectContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withNavigation(withStyles(styles)(CourseRedirectContainer));
