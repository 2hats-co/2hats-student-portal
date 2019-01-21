import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorIcon from '@material-ui/icons/ErrorRounded';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
const styles = theme => ({
  root: {
    background: theme.palette.background.default,
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
  useEffect(
    () => {
      console.log(location, location.search.id);
      cloudFunction(
        CLOUD_FUNCTIONS.LEARN_WORLD_SSO,
        { courseId: 'diy-car-service' },
        o => {
          window.location.href = o.data.url;
        },
        o => {
          console.log(o);
        }
      );
    },
    [hasId]
  );
  if (hasId)
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

export default withRouter(withStyles(styles)(CourseRedirectContainer));
