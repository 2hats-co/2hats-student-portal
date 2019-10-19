import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Div100vh from 'react-div-100vh';

import {
  makeStyles,
  createStyles,
  useMediaQuery,
  Grid,
  Toolbar,
} from '@material-ui/core';

import ErrorBoundary from '../ErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import BackButton from './BackButton';
import UserPrompts from './UserPrompts';

import { useUser } from 'contexts/UserContext';
import { setBackground } from 'utilities/styling';
import { SIDEBAR_WIDTH, IS_MOBILE_QUERY } from 'constants/layout';

const TRANSITION_DURATION = 250;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '100%',
      // overflowX: 'hidden',
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
      // overflow: 'hidden',
    },

    mainWrapperAnimation: {
      '&-enter': {
        transform: 'scale(0.95)',
        opacity: 0,
      },
      '&-enter-active': {
        transform: 'scale(1)',
        opacity: 1,

        transition: theme.transitions.create(['opacity', 'transform'], {
          duration: TRANSITION_DURATION,
          easing: theme.transitions.easing.easeOut,
        }),
      },

      '&-exit': { display: 'none' },
    },

    topBarSpacer: { margin: theme.spacing(-3, 0, 2) },
    bottomBarSpacer: { margin: theme.spacing(2, 0, -3) },
  })
);

interface INavigationProps extends RouteComponentProps {
  /**
   * Flag to show just logo, profile, and log out button.
   * Used for accounts to be deleted
   */
  limited?: boolean;
}

/**
 * The main wrapper component to show navigation. Handles showing different
 * navigation types on desktop and mobile with a single media query.
 *
 * Also has a basic transition using `react-transition-group`
 */
const Navigation: React.FunctionComponent<INavigationProps> = ({
  location,
  children,
  limited = false,
}) => {
  const classes = useStyles();

  useEffect(() => {
    // resets background
    setBackground();
  }, []);

  useEffect(() => {
    // Scroll to top on path name change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { user, profile } = useUser();

  const isMobile = useMediaQuery(IS_MOBILE_QUERY);

  // Can't assume we have listeners for user or profile,
  // since user did not necessarily sign in during this session
  if (!user || !profile) return <LoadingScreen message="Getting your data…" />;

  return (
    <Grid container className={classes.root} wrap="nowrap">
      {!isMobile && (
        <Grid item className={classes.navWrapper}>
          <DesktopNavigation limited={limited} />
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

              {isMobile && !limited && (
                <Toolbar className={classes.bottomBarSpacer} />
              )}
            </ErrorBoundary>
          </Grid>
        </CSSTransition>
      </TransitionGroup>

      {isMobile && <MobileNavigation limited={limited} />}

      <UserPrompts />
    </Grid>
  );
};

export default withRouter(Navigation);
