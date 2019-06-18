import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import withStyles from '@material-ui/core/styles/withStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { SIDEBAR_WIDTH } from './Navigation';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100vw',

    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,

    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    zIndex: 1,
  },
  contained: {
    width: '100%',
    position: 'static',
  },

  fakeNav: {
    backgroundColor: theme.palette.background.paper,

    width: 0,
    height: '100vh',

    [theme.breakpoints.down('sm')]: {
      height: 64,
      width: '100vw',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    [theme.breakpoints.down('xs')]: {
      height: 56,
    },
  },

  circularProgress: {
    color: '#F15A29' || theme.palette.primary.main,
  },

  message: {
    marginTop: theme.spacing(1),
  },
});

function LoadingScreen(props) {
  const {
    classes,
    theme,
    message,
    // showNav,
    contained,
  } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction={isMobile ? 'column-reverse' : 'row'}
      alignItems="center"
      //justify={showNav ? 'space-between' : 'center'}
      justify="center"
      className={classNames(classes.root, contained && classes.contained)}
    >
      {/* {showNav && <Grid item className={classes.fakeNav} />} */}

      <Grid item>
        <CircularProgress size={64} className={classes.circularProgress} />
        {message && (
          <Typography variant="h6" className={classes.message}>
            {message}
          </Typography>
        )}
      </Grid>

      {/* {showNav && <Grid item />} */}
    </Grid>
  );
}

LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  message: PropTypes.node,
  // showNav: PropTypes.bool,
  contained: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(LoadingScreen);
