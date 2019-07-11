import React from 'react';
import {
  withRouter,
  Link,
  match as ReactRouterMatch,
  RouteComponentProps,
} from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  useTheme,
  Grid,
  AppBar,
  Toolbar,
  LinearProgress,
  Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import GoIcon from 'assets/icons/Go';

import { getNextStageRoute } from 'utilities/onboarding';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      backgroundColor: 'transparent',
      color: ({ fullScreen }: any) =>
        fullScreen || theme.palette.type === 'dark'
          ? theme.palette.primary.main
          : theme.palette.primary.contrastText,
    },
    toolbarGutters: { padding: theme.spacing(0, 1, 0, 1.5) },

    logoWrapper: { lineHeight: 1 },
    logo: {
      width: 100,
      userSelect: 'none',
      userDrag: 'none',
      [theme.breakpoints.down('xs')]: { width: 70 },
    },

    progress: {
      width: 120,
      borderRadius: 1000,
    },
    progressBar: { borderRadius: 1000 },
    progressColorSecondary: {
      backgroundColor: fade(theme.palette.primary.contrastText, 0.12),
    },
    progressBarColorSecondary: {
      backgroundColor: theme.palette.primary.contrastText,
    },

    skipButtonWrapper: { textAlign: 'right' },
  })
);

export interface OnboardingHeaderProps extends RouteComponentProps<any> {
  /** From React Router. Uses /:stage to show specific onboarding stage */
  match: ReactRouterMatch<{ stage: string }>;
  /** Show a white screen (and logo) or not */
  fullScreen?: boolean;
  /** Progress bar value */
  progressValue?: number;
}

/**
 * Displays header with progress, logo, and skip button.
 * Broken out of OnboardingCard for better readability.
 */
const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  match,
  fullScreen,
  progressValue,
}) => {
  const classes = useStyles({ fullScreen });
  const theme = useTheme();

  return (
    <AppBar
      component="header"
      color={fullScreen ? 'default' : 'primary'}
      position="static"
      elevation={0}
      classes={{ root: classes.appBar }}
    >
      <Toolbar classes={{ gutters: classes.toolbarGutters }}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs={3} className={classes.logoWrapper}>
            {fullScreen && (
              <img
                src={theme.assets.logo}
                alt="2hats"
                className={classes.logo}
              />
            )}
          </Grid>

          <LinearProgress
            variant="determinate"
            // Use secondary colour to show white
            color={
              fullScreen || theme.palette.type === 'dark'
                ? 'primary'
                : 'secondary'
            }
            classes={{
              root: classes.progress,
              bar: classes.progressBar,
              colorSecondary: classes.progressColorSecondary,
              barColorSecondary: classes.progressBarColorSecondary,
            }}
            value={progressValue}
          />

          <Grid item xs={3} className={classes.skipButtonWrapper}>
            <Button
              color="inherit"
              component={Link}
              to={getNextStageRoute(match.params ? match.params.stage : '')}
            >
              Skip
              <GoIcon />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(OnboardingHeader);
