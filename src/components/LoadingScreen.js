import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import withStyles from '@material-ui/core/styles/withStyles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { DRAWER_WIDTH } from './withNavigation';

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

  fakeNav: {
    backgroundColor: theme.palette.background.paper,

    width: DRAWER_WIDTH,
    height: '100vh',

    [theme.breakpoints.down('sm')]: {
      height: 64,
      width: '100vw',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },

  circularProgressWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function LoadingScreen(props) {
  const { classes, theme, showNav } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!showNav)
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <CircularProgress color="primary" size={64} />
      </Grid>
    );

  return (
    <Grid
      container
      direction={isMobile ? 'column-reverse' : 'row'}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item className={classes.fakeNav} />
      <Grid item xs className={classes.circularProgressWrapper}>
        <CircularProgress color="primary" size={64} />
      </Grid>
    </Grid>
  );
}

LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  showNav: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(LoadingScreen);
