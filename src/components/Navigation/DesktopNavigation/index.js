import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Drawer, Grid, List, useMediaQuery } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import AssessmentsIcon from '@material-ui/icons/Assignment';
import CoursesIcon from '@material-ui/icons/School';
import FaqIcon from '@material-ui/icons/HelpOutline';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import SidebarItem from './SidebarItem';
import SuperAvatar from 'components/SuperAvatar';
import SidebarDivider from './SidebarDivider';

import * as ROUTES from 'constants/routes';
import { SIDEBAR_WIDTH } from '../index';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    borderRight: 'none',
    zIndex: 'auto',
    backgroundColor: theme.palette.background.default,

    '@media print': { display: 'none' },
  },
  nav: { height: '100%' },

  logoWrapper: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    justifyContent: 'flex-start',
    minHeight: 64,
  },
  logo: { width: 100, userSelect: 'none', userDrag: 'none' },

  listWrapper: { marginTop: theme.spacing(3) },

  avatar: { marginLeft: theme.spacing(-0.5) },
}));

/**
 * Persistent sidebar for main navigation items. Largely the same as old
 * withNavigation sidebar.
 */
const DesktopNavigation = () => {
  const classes = useStyles();
  const theme = useTheme();

  const showBottomDivider = useMediaQuery('(max-height: 524px)');

  const MAIN_NAV_ITEMS = [
    {
      label: 'Profile',
      icon: <SuperAvatar size={32} className={classes.avatar} />,
      route: ROUTES.PROFILE,
    },
    { label: 'Dashboard', icon: <DashboardIcon />, route: ROUTES.DASHBOARD },
    { type: 'divider' },
    {
      label: 'Assessments',
      icon: <AssessmentsIcon />,
      route: ROUTES.ASSESSMENTS,
    },
    { label: 'Jobs', icon: <JobsIcon />, route: ROUTES.JOBS },
    { label: 'Courses', icon: <CoursesIcon />, route: ROUTES.COURSES },
  ];
  const BOTTOM_NAV_ITEMS = [
    {
      label: 'FAQ',
      icon: <FaqIcon />,
      type: 'link',
      href: 'https://www.2hats.com.au/faq-for-students',
    },
    { type: 'divider' },
    { label: 'Sign Out', icon: <LogOutIcon />, route: ROUTES.LOG_OUT },
  ];

  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Grid
        container
        direction="column"
        component="nav"
        className={classes.nav}
        wrap="nowrap"
      >
        <Grid
          item
          className={classes.logoWrapper}
          component={Link}
          to={ROUTES.DASHBOARD}
        >
          <img src={theme.assets.logo} alt="2hats" className={classes.logo} />
        </Grid>

        <SidebarDivider />

        <Grid item xs>
          <List disablePadding>
            {MAIN_NAV_ITEMS.map((x, i) => (
              <li key={i}>
                <SidebarItem data={x} />
              </li>
            ))}
          </List>
        </Grid>

        <Grid item>
          <List disablePadding>
            {showBottomDivider && <SidebarDivider />}
            {BOTTOM_NAV_ITEMS.map((x, i) => (
              <li key={i}>
                <SidebarItem data={x} />
              </li>
            ))}
          </List>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default DesktopNavigation;
