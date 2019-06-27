import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';

// import { SIDEBAR_WIDTH } from './Navigation';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',

    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,

    textAlign: 'center',
    zIndex: 1,

    // prevent white flash in dark mode
    backgroundColor: theme.palette.background.default,
  },
  contained: {
    width: '100%',
    position: 'static',
  },

  fakeNav: {
    backgroundColor: theme.palette.background.default,

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
}));

function LoadingScreen({
  message,
  // showNav,
  contained,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction={isMobile ? 'column-reverse' : 'row'}
      alignItems="center"
      //justify={showNav ? 'space-between' : 'center'}
      justify="center"
      className={clsx(classes.root, contained && classes.contained)}
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
  message: PropTypes.node,
  // showNav: PropTypes.bool,
  contained: PropTypes.bool,
};

export default LoadingScreen;
