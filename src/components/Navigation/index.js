import React, { useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles, Grid, Toolbar, useMediaQuery } from '@material-ui/core';

import ErrorBoundary from '../ErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import BackButton from './BackButton';

import { useUser } from 'contexts/UserContext';
import { setBackground } from 'utilities/styling';
import { SIDEBAR_WIDTH, IS_MOBILE_QUERY } from 'constants/layout';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    overflowX: 'hidden',
  },

  navWrapper: {
    overflowY: 'auto',
    '@media print': { display: 'none' },
    width: SIDEBAR_WIDTH,
    height: '100%',
  },
  mobileNavWrapper: { width: 0 },

  mainWrapper: {
    minHeight: '100vh',
    padding: theme.spacing(3, 0),
    overflow: 'hidden',
  },
  mainWrapperAnimation: {
    animationName: '$main-wrapper-keyframes',
    animationDuration: theme.transitions.duration.standard,
    animationTimingFunction: theme.transitions.easing.easeOut,
  },
  '@keyframes main-wrapper-keyframes': {
    from: { opacity: 0, transform: 'translateY(10px) scale(0.99)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
  },

  topBarSpacer: { margin: theme.spacing(-3, 0, 2) },
  bottomBarSpacer: { margin: theme.spacing(2, 0, -3) },
}));

const Navigation = ({ location, children }) => {
  const classes = useStyles();

  const mainWrapperRef = useRef(null);

  useEffect(() => {
    // resets background
    setBackground();
  }, []);

  useLayoutEffect(() => {
    if (!mainWrapperRef || !mainWrapperRef.current) return;
    window.scrollTo(0, 0);
    mainWrapperRef.current.classList.add(classes.mainWrapperAnimation);
    setTimeout(() => {
      mainWrapperRef.current.classList.remove(classes.mainWrapperAnimation);
    }, 300);
  }, [location.pathname, classes.mainWrapperAnimation]);

  const { user } = useUser();

  const isMobile = useMediaQuery(IS_MOBILE_QUERY);

  // Can't assume user exists, since user did not necessarily sign
  // in during this session
  if (!user) return <LoadingScreen showNav message="Getting your data…" />;

  return (
    <Grid container className={classes.root} wrap="nowrap">
      {!isMobile && (
        <Grid item className={classes.navWrapper}>
          <DesktopNavigation />
        </Grid>
      )}

      <Grid item xs className={classes.mainWrapper} ref={mainWrapperRef}>
        <ErrorBoundary>
          {isMobile && <Toolbar className={classes.topBarSpacer} />}
          {!isMobile && <BackButton isMobile={false} />}

          {children}

          {isMobile && <Toolbar className={classes.bottomBarSpacer} />}
        </ErrorBoundary>
      </Grid>
      {isMobile && <MobileNavigation />}
    </Grid>
  );
};

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withRouter(Navigation);
