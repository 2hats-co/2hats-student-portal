import React, { useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, Toolbar, useMediaQuery } from '@material-ui/core';

import ErrorBoundary from '../ErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import BackButton from './BackButton';

import UserContext from 'contexts/UserContext';
import { setBackground } from 'utilities/styling';

export const SIDEBAR_WIDTH = 256;

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
  },
  mainWrapperAnimation: {
    animationName: '$main-wrapper-keyframes',
    animationDuration: theme.transitions.duration.standard,
    animationTimingFunction: theme.transitions.easing.easeOut,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  },
  '@keyframes main-wrapper-keyframes': {
    from: { opacity: 0, transform: 'translateY(10px) scale(0.99)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
  },
}));

const Navigation = ({ location, children }) => {
  const classes = useStyles();
  const theme = useTheme();

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
  }, [location.pathname]);

  const { user } = useContext(UserContext);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Style override for FB Messenger chat
  if (isMobile) document.body.classList.add('fb_up');
  else document.body.classList.remove('fb_up');

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
          {isMobile && <Toolbar />}
          {!isMobile && <BackButton isMobile={false} />}

          {children}

          {isMobile && <Toolbar />}
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
