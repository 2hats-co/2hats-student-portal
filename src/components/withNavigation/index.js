import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import equals from 'ramda/es/equals';

import withAuthorisation from '../../utilities/Session/withAuthorisation';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import MenuIcon from '@material-ui/icons/MenuRounded';
import ActivityLogIcon from '@material-ui/icons/HistoryRounded';
import DashboardIcon from '@material-ui/icons/DashboardRounded';
import ProfileIcon from '@material-ui/icons/PersonRounded';
import JobsIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentsIcon from '@material-ui/icons/AssignmentRounded';
import CoursesIcon from '@material-ui/icons/SchoolRounded';

import ContactIcon from '@material-ui/icons/ForumRounded';
import FaqIcon from '@material-ui/icons/HelpRounded';
import AccountInfoIcon from '@material-ui/icons/EditRounded';
import LogOutIcon from '@material-ui/icons/ExitToAppRounded';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { setBackground } from '../../utilities/styling';
import * as ROUTES from '../../constants/routes';

import logo from '../../assets/images/Logo/DarkText.svg';
import blackLogo from '../../assets/images/Logo/Black.svg';
import blackIconLogo from '../../assets/images/Logo/BlackIcon.svg';
import greyBg from '../../assets/background/BW.svg';

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
  },
  drawerBorder: {
    boxShadow: `-1px 0 0 ${theme.palette.divider} inset`,
    borderRight: 'none',
  },
  nav: { height: '100%' },

  logoButton: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    '&:hover': { backgroundColor: theme.palette.action.hover },
  },
  logo: { width: 100 },

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
  listWrapper: { marginTop: theme.spacing.unit * 3 },
  listItemRoot: {
    transition: theme.transitions.create([
      'background-color',
      'box-shadow',
      'color',
    ]),
  },
  listItemTextRoot: { padding: 0 },
  divider: { margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px` },
  selected: {
    color: theme.palette.primary.main,
    boxShadow: `-4px 0 0 ${theme.palette.primary.main} inset`,
    backgroundColor: theme.palette.primary.light,

    '&:hover': { backgroundColor: theme.palette.primary.light },
    '& *': { color: theme.palette.primary.main },
  },

  navFab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,

    width: 60,
    height: 60,

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    '&:hover': { backgroundColor: theme.palette.background.paper },
    '& svg': { fontSize: 35 },
  },

  activityLogFab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 11,

    width: 60,
    height: 60,

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '&:hover': { backgroundColor: theme.palette.background.paper },
    '& svg': { fontSize: 32 },

    '& $badge': {
      top: -7,
      right: -7,
    },
  },

  wrappedComponentWrapper: { transition: theme.transitions.create('opacity') },
  wrappedComponentGrid: {
    minHeight: 'calc(100vh + 108px)',
    backgroundColor: '#e1e1e1',
  },
  fadeOut: { opacity: 0 },

  wrappedComponent: {
    backgroundImage: `url(${greyBg})`,
    backgroundSize: 'cover',
    // backgroundColor: theme.palette.background.default,
    backgroundColor: '#e1e1e1',
    boxShadow: `0px -11px 15px -7px rgba(0,0,0,0.1),
      0px -24px 38px 3px rgba(0,0,0,0.07)`,
    minHeight: '100vh',
  },

  bottomLogo: {
    width: 100,
    height: 60,

    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,

    opacity: 0.38,

    [theme.breakpoints.down('sm')]: { paddingLeft: 72 },

    '@media (max-width: 348px)': { width: 44 },
  },
});

export default function withNavigation(WrappedComponent) {
  function WithNavigation(props) {
    const { classes, theme, history, location, authUser } = props;

    setBackground(theme.palette.background.default);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const iconLogo = useMediaQuery('(max-width: 348px)');
    const showBottomDivider = useMediaQuery('(max-height: 680px)');

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

    useEffect(() => {
      window.Intercom('update', {
        hide_default_launcher: false,
      });
    }, []);

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
        label: 'Contact Us',
        icon: <ContactIcon />,
        onClick: () => {
          window.Intercom('show');
        },
      },
      {
        label: 'FAQ',
        icon: <FaqIcon />,
        type: 'link',
        href: 'https://intercom.help/2hats/faq-for-students',
      },
      { type: 'divider' },
      {
        label: 'Edit Account Info',
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
              classes={{
                paper: classes.drawerPaper,
                paperAnchorDockedLeft: classes.drawerBorder,
              }}
            >
              <Grid
                container
                direction="column"
                component="nav"
                className={classes.nav}
                wrap="nowrap"
              >
                <Grid item>
                  <ButtonBase
                    id="logo-button"
                    onClick={() => {
                      goTo(ROUTES.DASHBOARD);
                    }}
                    className={classes.logoButton}
                  >
                    <img src={logo} alt="2hats" className={classes.logo} />
                  </ButtonBase>
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
                    >
                      <ActivityLogIcon />
                    </Badge>
                  </IconButton>
                  <Divider className={classes.divider} />
                </Grid>
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
            <AccountInfoDialog
              user={user}
              open={showAccountInfo}
              closeHandler={() => {
                setShowAccountInfo(false);
              }}
            />
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
              <Grid
                container
                direction="column"
                wrap="nowrap"
                justify="space-between"
                className={classes.wrappedComponentGrid}
              >
                <WrappedComponent
                  {...props}
                  classes={null}
                  className={classes.wrappedComponent}
                  isMobile={isMobile}
                  user={user}
                  location={location}
                />
                <img
                  src={iconLogo ? blackIconLogo : blackLogo}
                  alt="2hats"
                  className={classes.bottomLogo}
                />
              </Grid>
            ) : (
              <LoadingScreen showNav />
            )}
          </Grid>

          {isMobile && (
            <>
              <Fab
                onClick={() => {
                  setNavOpen(true);
                }}
                className={classes.navFab}
                color="primary"
              >
                <MenuIcon />
              </Fab>
              <Fab
                onClick={() => {
                  setActivityLogOpen('bottom');
                }}
                className={classes.activityLogFab}
              >
                <Badge
                  color="primary"
                  classes={{ badge: classes.badge }}
                  badgeContent="!"
                >
                  <ActivityLogIcon />
                </Badge>
              </Fab>
            </>
          )}

          {activityLogOpen && user && (
            <ActivityLog
              showDialog={activityLogOpen}
              setShowDialog={setActivityLogOpen}
              user={user}
              isMobile={isMobile}
            />
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
