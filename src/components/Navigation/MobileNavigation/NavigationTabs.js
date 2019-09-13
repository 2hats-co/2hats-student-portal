import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Slide,
} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import AssessmentsIcon from '@material-ui/icons/Assignment';
import CoursesIcon from '@material-ui/icons/School';

import * as ROUTES from 'constants/routes';
import { getBaseRoute } from 'utilities/routing';

const useStyles = makeStyles(theme => ({
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    padding:
      '0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
  },

  BottomNavigationActionRoot: {
    boxSizing: 'border-box',
    alignItems: 'flex-start',

    '&$BottomNavigationActionSelected': {
      paddingTop: theme.spacing(1) - 1,
    },

    [theme.breakpoints.up('sm')]: {
      maxWidth: 'none',
      alignItems: 'center',
      paddingTop: theme.spacing(1) - 1,
    },
  },
  BottomNavigationActionSelected: {},
  BottomNavigationActionWrapper: {
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  BottomNavigationActionLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(14),
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

/**
 * Can’t just set a `selected` class directly like before—have to use a
 * state and check with `useEffect` on `location.pathname` because of
 * Material UI `BottomNavigation`.
 *
 * Also pushes the FB Customer Chat button up/down by setting the `.fb_up`
 * CSS class on the `body`
 */
const NavigationTabs = ({ location, triggerHide }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    const newValue = getBaseRoute(location.pathname);
    if (value !== newValue) setValue(newValue);
  }, [location.pathname, value]);

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  // Style override for FB Messenger chat — pushes up when the navigation
  // tabs are visible
  const shouldPushFbChatBubbleUp = !triggerHide;
  if (document.body.classList.contains('fb_up') !== shouldPushFbChatBubbleUp)
    document.body.classList[shouldPushFbChatBubbleUp ? 'add' : 'remove'](
      'fb_up'
    );

  return (
    <Slide appear={false} direction="up" in={!triggerHide}>
      <AppBar
        position="fixed"
        className={classes.bottomAppBar}
        color="default"
        component="footer"
      >
        <BottomNavigation
          value={value}
          onChange={(e, val) => setValue(val)}
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
                selected: classes.BottomNavigationActionSelected,
                wrapper: classes.BottomNavigationActionWrapper,
                label: classes.BottomNavigationActionLabel,
              }}
              component={Link}
            />
          ))}
        </BottomNavigation>
      </AppBar>
    </Slide>
  );
};

NavigationTabs.propTypes = {
  /** From `withRouter` */
  location: PropTypes.object.isRequired,
  /** Hook value from `MobileNavigation` */
  triggerHide: PropTypes.bool.isRequired,
};

export default withRouter(NavigationTabs);
