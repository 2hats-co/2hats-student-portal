import React, { useEffect, useContext } from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, Toolbar, useMediaQuery } from '@material-ui/core';

import ErrorBoundary from '../ErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import NavigationSidebar from './NavigationSidebar';
import NavigationTabs from './NavigationTabs';

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
}));

const Navigation = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    console.log('MOUNT NAVIGATION');
    // resets background to white
    setBackground(theme.palette.background.paper);
  }, []);

  const { user } = useContext(UserContext);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Style override for FB Messenger chat
  if (isMobile) document.body.classList.add('fb_up');
  else document.body.classList.remove('fb_up');

  return (
    <Grid container className={classes.root} wrap="nowrap">
      {!isMobile && (
        <Grid item className={classes.navWrapper}>
          <NavigationSidebar />
        </Grid>
      )}

      <Grid item xs className={classes.mainWrapper}>
        <ErrorBoundary>
          {isMobile && <Toolbar />}
          {// Can't assume user exists, since user did not necessarily sign
          // in during this session
          user ? children : <LoadingScreen showNav />}
          {isMobile && <Toolbar />}
        </ErrorBoundary>
      </Grid>

      {isMobile && <NavigationTabs />}
    </Grid>
  );
};

export default Navigation;
