import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  LinearProgress,
  Button,
  Grid,
  Paper,
} from '@material-ui/core';
import GoIcon from 'assets/icons/Go';

import Background from 'assets/background/Colour.svg';
import { setBackground } from 'utilities/styling';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'transparent',
  },
  progressBar: {
    width: 120,
  },
  skipButton: {
    opacity: 0.6,
  },

  root: {
    minHeight: '100vh',

    padding: theme.spacing(2),
  },

  paper: {
    maxWidth: 960,
    minHeight: 620,

    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },

  contentWrapper: {
    maxWidth: 360,
  },
}));

const OnboardingCard = ({ children, fullScreen }) => {
  const classes = useStyles();
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
    <>
      <AppBar
        component="header"
        color={fullScreen ? 'default' : 'primary'}
        position="static"
        elevation={0}
        classes={{ root: classes.appBar }}
      >
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <LinearProgress variant="determinate" value={25} />

            <Button color="inherit" className={classes.skipButton}>
              Skip
              <GoIcon />
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        wrap="nowrap"
        className={classes.root}
      >
        <Paper
          elevation={fullScreen ? 0 : 3}
          component="main"
          className={classes.paper}
        >
          <div className={classes.contentWrapper}>{children}</div>
        </Paper>
      </Grid>
    </>
  );
};

OnboardingCard.propTypes = {
  children: PropTypes.node,
  fullScreen: PropTypes.bool,
};
OnboardingCard.defaultProps = {
  fullScreen: false,
};

export default OnboardingCard;
