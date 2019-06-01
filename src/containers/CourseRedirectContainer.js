import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ErrorIcon from '@material-ui/icons/ErrorOutline';

import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import { updateDoc } from '../utilities/firestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import withNavigation from '../components/withNavigation';
import UserContext from '../contexts/UserContext';

import LoadingScreen from '../components/LoadingScreen';
import BackButton from '../components/ContainerHeader/BackButton';

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
    height: '100vh',
    textAlign: 'center',
  },

  message: {
    marginTop: theme.spacing(1),
  },

  errorIcon: {
    fontSize: 64,
    color: theme.palette.text.secondary,
  },

  backButton: {
    position: 'relative !important',
    marginTop: theme.spacing(3),
  },
});

function CourseRedirectContainer(props) {
  const { classes, location } = props;

  const [error, setError] = useState(false);

  const parsedQuery = queryString.parse(location.search);
  const hasId = parsedQuery.id && parsedQuery.id.length > 0;

  const userContext = useContext(UserContext);
  const user = userContext.user;

  useEffect(() => {
    document.title = '2hats – Courses – Redirecting…';
  }, []);

  useEffect(() => {
    if (!hasId || !user) return;
    // touch the course
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
      { courseId: parsedQuery.id },
      res => {
        window.location.replace(res.data.url);
      },
      err => {
        console.error(err);
        setError(true);
      }
    );
  }, [user]);

  if (!user) return <LoadingScreen contained message="Loading…" />;

  if (hasId && !error)
    return (
      <LoadingScreen
        contained
        message="Redirecting you to the 2hats Education Portal…"
      />
    );

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
          This link is invalid
        </Typography>
        <BackButton className={classes.backButton} />
      </Grid>
    </Grid>
  );
}

CourseRedirectContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withNavigation(withStyles(styles)(CourseRedirectContainer));
