import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import AssessmentsIcon from '@material-ui/icons/Assignment';
import CoursesIcon from '@material-ui/icons/School';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import logo from 'assets/images/Logo/DarkText.svg';
import SuperAvatar from 'components/SuperAvatar';

import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(theme => ({
  logo: {
    height: 28,
    userSelect: 'none',
    userDrag: 'none',
    cursor: 'pointer',
  },
  avatarButton: { padding: 0, width: 48, height: 48 },

  bottomAppBar: {
    top: 'auto',
    bottom: 0,
  },

  BottomNavigationActionRoot: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'none',
    },
  },
  BottomNavigationActionWrapper: {
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  BottomNavigationActionLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      marginLeft: theme.spacing(1),
    },
  },
}));

const NAV_TABS = [
  { label: 'Dashboard', icon: <DashboardIcon />, route: ROUTES.DASHBOARD },
  {
    label: 'Assessments',
    icon: <AssessmentsIcon />,
    route: ROUTES.ASSESSMENTS,
  },
  { label: 'Jobs', icon: <JobsIcon />, route: ROUTES.JOBS },
  { label: 'Courses', icon: <CoursesIcon />, route: ROUTES.COURSES },
];

const NavigationTabs = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState('/assessments');

  const triggerHide = useScrollTrigger();
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Slide
        appear={false}
        direction="down"
        in={!triggerHide}
        elevation={triggerElevation ? 4 : 0}
      >
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Grid
              container
              wrap="nowrap"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <img src={logo} alt="2hats" className={classes.logo} />
              </Grid>

              <Grid item>
                <IconButton className={classes.avatarButton}>
                  <SuperAvatar size={32} />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <Slide appear={false} direction="up" in={!triggerHide}>
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels={!isXs}
            component="nav"
          >
            {NAV_TABS.map((x, i) => (
              <BottomNavigationAction
                key={i}
                label={x.label}
                icon={x.icon}
                value={x.route}
                to={x.route}
                classes={{
                  root: classes.BottomNavigationActionRoot,
                  wrapper: classes.BottomNavigationActionWrapper,
                  label: classes.BottomNavigationActionLabel,
                }}
              />
            ))}
          </BottomNavigation>
        </AppBar>
      </Slide>
    </>
  );
};

export default NavigationTabs;
