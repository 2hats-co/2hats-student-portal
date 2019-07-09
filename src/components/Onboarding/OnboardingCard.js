import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, Paper } from '@material-ui/core';

import OnboardingHeader from './OnboardingHeader';

import Background from 'assets/background/Colour.svg';
import { setBackground } from 'utilities/styling';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
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

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ({ fullScreen }) =>
      fullScreen ? theme.spacing(1) : theme.spacing(4, 3),
    margin: 'auto',

    backgroundColor: ({ fullScreen }) =>
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
    maxWidth: 480,
  },
}));

/**
 * Wraps content around a white card on an orange (or white) background.
 * OnboardingHeader includes header with progress, logo, and skip button
 */
const OnboardingCard = ({ children, fullScreen, progressValue }) => {
  const classes = useStyles({ fullScreen });
  const theme = useTheme();

  useEffect(() => {
    if (!fullScreen && theme.palette.type !== 'dark')
      setBackground('#FA5E4E', Background, false);
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
    >
      <OnboardingHeader fullScreen={fullScreen} progressValue={progressValue} />

      <Grid item className={classes.paperWrapper}>
        <Paper
          elevation={fullScreen ? 0 : 3}
          component="main"
          className={classes.paper}
        >
          <div className={classes.contentWrapper}>{children}</div>
        </Paper>
      </Grid>

      {/* Spacer div */}
      <div />
    </Grid>
  );
};

OnboardingCard.propTypes = {
  children: PropTypes.node,
  /** Show a white screen (and logo) or not */
  fullScreen: PropTypes.bool,
  /** Progress bar value */
  progressValue: PropTypes.number,
};
OnboardingCard.defaultProps = {
  fullScreen: false,
  progressValue: 50,
};

export default OnboardingCard;
