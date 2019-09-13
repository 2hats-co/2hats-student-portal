import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Div100vh from 'react-div-100vh';

import {
  makeStyles,
  createStyles,
  useTheme,
  Grid,
  Paper,
} from '@material-ui/core';

import OnboardingHeader from './OnboardingHeader';
import { OnboardingContainerProps } from 'containers/OnboardingContainer';

import Background from 'assets/background/Colour.svg';
import { setBackground } from 'utilities/styling';

const TRANSITION_DURATION = 350;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding:
        'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
    },

    // Use a wrapper with padding instead of setting a margin on the Paper
    // component to prevent having to do width: calc(100% - 16px)
    paperWrapper: {
      width: '100%',
      padding: theme.spacing(0, 1, 1),
    },
    paper: {
      maxWidth: 960,

      width: '100%',
      minHeight: ({ fullScreen }: any) => (fullScreen ? 0 : 640),

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(4, 3),
      margin: 'auto',

      backgroundColor: ({ fullScreen }: any) =>
        fullScreen
          ? theme.palette.type === 'dark'
            ? theme.palette.background.default
            : theme.palette.background.paper
          : theme.palette.background.paper,

      transition: theme.transitions.create('background-color'),

      // Optically-correct vertical centering
      // '@media (min-height: 740px)': { marginTop: theme.spacing(-3) },
    },

    contentWrapper: {
      maxWidth: 520,
      minHeight: ({ fullScreen }: any) =>
        fullScreen ? 0 : 640 - theme.spacing(4 * 2),
      overflowX: 'hidden',
    },

    slide: {
      '&-enter': {
        opacity: 0,
        transform: 'translateX(40px)',
      },
      '&-enter-active': {
        opacity: 1,
        transform: 'translateX(0)',
        transition: theme.transitions.create(['opacity', 'transform'], {
          duration: TRANSITION_DURATION,
        }),
      },

      '&-exit': { display: 'none' },
    },
  })
);

export interface OnboardingCardProps extends OnboardingContainerProps {
  children?: React.ReactNode;
  /** Show a white screen (and logo) or not */
  fullScreen?: boolean;
  /** Progress bar value */
  progressValue?: number;
}

/**
 * Wraps content around a white card on an orange (or white) background.
 * OnboardingHeader includes header with progress, logo, and skip button
 */
const OnboardingCard: React.FC<OnboardingCardProps> = ({
  children,
  fullScreen = false,
  progressValue = 50,
  location,
}) => {
  const classes = useStyles({ fullScreen });
  const theme = useTheme();

  useEffect(() => {
    if (!fullScreen && theme.palette.type !== 'dark')
      setBackground('#FA5E4E', Background);
    else setBackground();
    return () => {
      setBackground();
    };
  }, [fullScreen, theme.palette.type]);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
      className={classes.root}
      component={Div100vh}
      style={{ minHeight: '100rvh' }}
    >
      <OnboardingHeader fullScreen={fullScreen} progressValue={progressValue} />

      <Grid item className={classes.paperWrapper}>
        <Paper elevation={fullScreen ? 0 : 3} className={classes.paper}>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            component="main"
            className={classes.contentWrapper}
          >
            <TransitionGroup component={null}>
              <CSSTransition
                timeout={TRANSITION_DURATION}
                classNames={classes.slide}
                key={location.key}
              >
                <div>{children}</div>
              </CSSTransition>
            </TransitionGroup>
          </Grid>
        </Paper>
      </Grid>

      {/* Spacer div */}
      <div />
    </Grid>
  );
};

export default OnboardingCard;
