import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';

import { IS_MOBILE_QUERY } from 'constants/layout';

const useStyles = makeStyles(theme =>
  createStyles({
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
      height: '100%',
      position: 'static',

      [IS_MOBILE_QUERY]: {
        height: 'calc(100% - 128px)', // Vertical center for app bars
      },
    },

    circularProgress: { color: theme.palette.primary.main },

    message: {
      marginTop: theme.spacing(2),
      // Prevent message from causing the spinner to jump
      marginBottom: `calc(-${
        theme.typography.h6.lineHeight
      }em - ${theme.spacing(1)}px)`,
    },
  })
);

export interface LoadingScreenProps {
  message?: React.ReactNode;
  /** Optionally, don’t take full screen width */
  contained?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  contained = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction={isMobile ? 'column-reverse' : 'row'}
      alignItems="center"
      justify="center"
      className={clsx(classes.root, contained && classes.contained)}
    >
      <Grid item>
        <CircularProgress size={64} className={classes.circularProgress} />
        {message && (
          <Typography variant="h6" className={classes.message}>
            {message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
