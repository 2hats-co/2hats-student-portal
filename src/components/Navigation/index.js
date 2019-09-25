import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Div100vh from 'react-div-100vh';

import { makeStyles, Grid, Toolbar, useMediaQuery } from '@material-ui/core';

import ErrorBoundary from '../ErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import BackButton from './BackButton';

import { useUser } from 'contexts/UserContext';
import { setBackground } from 'utilities/styling';
import { SIDEBAR_WIDTH, IS_MOBILE_QUERY } from 'constants/layout';

const TRANSITION_DURATION = 200;

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
    padding: theme.spacing(3, 0),
    overflow: 'hidden',
  },

  mainWrapperAnimation: {
    '&-enter': {
      transform: 'scale(0.97, 0.95)',
    },
    '&-enter-active': {
      transform: 'scale(1)',

      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: TRANSITION_DURATION,
        easing: theme.transitions.easing.easeOut,
      }),
    },

    '&-exit': { display: 'none' },
  },

  topBarSpacer: { margin: theme.spacing(-3, 0, 2) },
  bottomBarSpacer: { margin: theme.spacing(2, 0, -3) },
}));

const Navigation = ({ location, children }) => {
  const classes = useStyles();

  useEffect(() => {
    // resets background
    setBackground();
  }, []);

  useEffect(() => {
    // Scroll to top on path name change
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

      <TransitionGroup component={null}>
        <CSSTransition
          timeout={TRANSITION_DURATION}
          classNames={classes.mainWrapperAnimation}
          key={location.key}
          appear
        >
          <Grid
            item
            xs
            className={classes.mainWrapper}
            component={Div100vh}
            style={{ minHeight: '100rvh' }}
          >
            <ErrorBoundary>
              {isMobile && <Toolbar className={classes.topBarSpacer} />}
              {!isMobile && <BackButton isMobile={false} />}

              {children}

              {isMobile && <Toolbar className={classes.bottomBarSpacer} />}
            </ErrorBoundary>
          </Grid>
        </CSSTransition>
      </TransitionGroup>

      {isMobile && <MobileNavigation />}
    </Grid>
  );
};

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withRouter(Navigation);
