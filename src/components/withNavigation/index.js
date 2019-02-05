import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import equals from 'ramda/es/equals';

import withAuthorisation from '../../utilities/Session/withAuthorisation';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/MenuOutlined';
import ActivityLogIcon from '@material-ui/icons/HistoryOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ProfileIcon from '@material-ui/icons/PersonOutlined';
import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';
import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import FaqIcon from '@material-ui/icons/HelpOutline';
import AccountInfoIcon from '@material-ui/icons/SettingsOutlined';
import LogOutIcon from '@material-ui/icons/ExitToAppOutlined';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { setBackground } from '../../utilities/styling';
import * as ROUTES from '../../constants/routes';

import logo from '../../assets/images/Logo/DarkText.svg';
import blackLogo from '../../assets/images/Logo/Black.svg';

import User from './User';
import NavItem from './NavItem';
import LoadingScreen from '../LoadingScreen';
import AccountInfoDialog from '../AccountInfoDialog';
import ActivityLog from '../ActivityLog';

import useDocument from '../../hooks/useDocument';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import UserContext from '../../contexts/UserContext';

export const DRAWER_WIDTH = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    overflowX: 'hidden',
  },

  desktopNavWrapper: {
    width: DRAWER_WIDTH,
    height: '100%',
    overflowY: 'auto',
  },
  mobileNavWrapper: {
    width: 0,
    overflowY: 'auto',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    borderRight: 'none',
    '$desktopNavWrapper &': { zIndex: 1 },
  },
  nav: { height: '100%' },

  logoWrapper: {
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    justifyContent: 'flex-start',
    minHeight: 64,
  },
  logo: { width: 100, userSelect: 'none', userDrag: 'none' },

  activityLogButton: {
    position: 'absolute',
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 0.75,
    color: theme.palette.primary,
    '& svg': { fontSize: theme.spacing.unit * 4 },
  },
  badge: { boxShadow: '0 0 0 2px #fff' },

  userWrapper: {
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit,
    cursor: 'default',
  },

  divider: { margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2.25}px` },

  listWrapper: { marginTop: theme.spacing.unit * 3 },
  listItemRoot: {
    transition: theme.transitions.create(['background-color', 'color']),
    borderRadius: '0 20px 20px 0',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,

    margin: `${theme.spacing.unit / 2}px 0`,
    marginRight: theme.spacing.unit,
    width: 'auto',
  },
  listItemTextRoot: { padding: 0 },
  selected: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,

    '&:hover': { backgroundColor: theme.palette.primary.light },
    '& *': { color: theme.palette.primary.main },
  },

  wrappedComponentWrapper: {
    transition: theme.transitions.create('opacity'),
    zIndex: 2,
  },
  fadeOut: { opacity: 0 },

  wrappedComponent: { minHeight: '100vh' },
  wrappedComponentMobilePadding: { paddingBottom: theme.spacing.unit * 10 },

  appBar: {
    top: 'auto',
    bottom: 0,

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    boxShadow: `0 1px 0 ${theme.palette.divider} inset`,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.unit * 1.5}px`,
  },
  bottomLogo: {
    height: 28,
    opacity: 0.5,
    userSelect: 'none',
    userDrag: 'none',
  },
});

export default function withNavigation(WrappedComponent) {
  function WithNavigation(props) {
    const { classes, theme, history, location, authUser } = props;

    setBackground(theme.palette.background.paper);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const showBottomDivider = useMediaQuery('(max-height: 660px)');

    if (isMobile) document.body.classList.add('fb_up');
    else document.body.classList.remove('fb_up');

    const [navOpen, setNavOpen] = useState(false);
    const [activityLogOpen, setActivityLogOpen] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(location.pathname);

    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const userContext = useContext(UserContext);
    const [userState] = useDocument({
      path: `${COLLECTIONS.users}/${authUser.uid}`,
    });
    useEffect(
      () => {
        if (userState.doc && !equals(userState.doc, userContext.user))
          userContext.setUser(userState.doc);
      },
      [userState.doc]
    );
    const user = userContext.user;

    const goTo = route => {
      setNavOpen(false);
      setSelectedRoute(route);
      if (route !== location.pathname || location.search) {
        if (!location.search) setFadeOut(true);
        setTimeout(() => {
          history.push(route);
        }, 300);
      }
    };

    const MAIN_NAV_ITEMS = [
      { label: 'Dashboard', icon: <DashboardIcon />, route: ROUTES.DASHBOARD },
      { label: 'Profile', icon: <ProfileIcon />, route: ROUTES.PROFILE },
      { type: 'divider' },
      { label: 'Jobs', icon: <JobsIcon />, route: ROUTES.JOBS },
      {
        label: 'Assessments',
        icon: <AssessmentsIcon />,
        route: ROUTES.ASSESSMENTS,
      },
      { label: 'Courses', icon: <CoursesIcon />, route: ROUTES.COURSES },
    ];
    const BOTTOM_NAV_ITEMS = [
      {
        label: 'FAQ',
        icon: <FaqIcon />,
        type: 'link',
        href: 'https://intercom.help/2hats/faq-for-students',
      },
      { type: 'divider' },
      {
        disabled: !user,
        label: 'Update Account Info',
        icon: <AccountInfoIcon />,
        onClick: () => {
          setShowAccountInfo(true);
        },
      },
      { label: 'Log Out', icon: <LogOutIcon />, route: ROUTES.LOG_OUT },
    ];

    return (
      <>
        <Grid container className={classes.root} wrap="nowrap">
          <Grid
            item
            className={
              !isMobile ? classes.desktopNavWrapper : classes.mobileNavWrapper
            }
          >
            <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
              open={navOpen || !isMobile}
              onClose={() => {
                if (isMobile) setNavOpen(false);
              }}
              classes={{ paper: classes.drawerPaper }}
            >
              <Grid
                container
                direction="column"
                component="nav"
                className={classes.nav}
                wrap="nowrap"
              >
                <Grid item className={classes.logoWrapper}>
                  <img src={logo} alt="2hats" className={classes.logo} />
                  <IconButton
                    className={classes.activityLogButton}
                    onClick={() => {
                      setActivityLogOpen(true);
                    }}
                  >
                    <Badge
                      color="primary"
                      classes={{ badge: classes.badge }}
                      badgeContent="!"
                      invisible
                    >
                      <ActivityLogIcon />
                    </Badge>
                  </IconButton>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item className={classes.userWrapper}>
                  <User user={user} />
                </Grid>
                <Grid item xs>
                  <List disablePadding>
                    {MAIN_NAV_ITEMS.map((x, i) => (
                      <NavItem
                        data={x}
                        key={i}
                        selected={selectedRoute === x.route}
                        goTo={goTo}
                        classes={classes}
                      />
                    ))}
                  </List>
                </Grid>
                <Grid item>
                  <List disablePadding>
                    {showBottomDivider && (
                      <Divider className={classes.divider} />
                    )}
                    {BOTTOM_NAV_ITEMS.map((x, i) => (
                      <NavItem data={x} key={i} goTo={goTo} classes={classes} />
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Drawer>
          </Grid>

          <Grid
            item
            xs
            className={classNames(
              classes.wrappedComponentWrapper,
              fadeOut && classes.fadeOut
            )}
          >
            {user ? (
              <WrappedComponent
                {...props}
                classes={null}
                className={classNames(
                  classes.wrappedComponent,
                  isMobile && classes.wrappedComponentMobilePadding
                )}
                isMobile={isMobile}
                user={user}
                location={location}
              />
            ) : (
              <LoadingScreen showNav />
            )}
          </Grid>

          {isMobile && (
            <AppBar position="fixed" color="default" className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  color="primary"
                  aria-label="Open navigation drawer"
                  onClick={() => {
                    setNavOpen(true);
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <img
                  src={blackLogo}
                  alt="2hats"
                  className={classes.bottomLogo}
                />

                <IconButton
                  color="inherit"
                  aria-label="Activity log"
                  onClick={() => {
                    setActivityLogOpen('bottom');
                  }}
                >
                  <Badge
                    color="primary"
                    classes={{ badge: classes.badge }}
                    badgeContent="!"
                    invisible
                  >
                    <ActivityLogIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
          )}

          {activityLogOpen && user && (
            <ActivityLog
              showDialog={activityLogOpen}
              setShowDialog={setActivityLogOpen}
              user={user}
              isMobile={isMobile}
            />
          )}

          {showAccountInfo && user && (
            <AccountInfoDialog user={user} setShowDialog={setShowAccountInfo} />
          )}
        </Grid>
      </>
    );
  }
  const authCondition = authUser => !!authUser;
  return withRouter(
    withAuthorisation(authCondition)(
      withStyles(styles, { withTheme: true })(WithNavigation)
    )
  );
}
