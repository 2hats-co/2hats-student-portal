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

import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/Person';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import AssessmentsIcon from '@material-ui/icons/Assignment';
import CoursesIcon from '@material-ui/icons/School';

import ContactIcon from '@material-ui/icons/Forum';
import FaqIcon from '@material-ui/icons/Help';
import AccountInfoIcon from '@material-ui/icons/Edit';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { setBackground } from '../../utilities/styling';
import * as ROUTES from '../../constants/routes';

import logo from '../../assets/images/Logo/DarkText.svg';
import User from './User';
import NavItem from './NavItem';
import AccountInfoDialog from '../AccountInfoDialog';
import useDocument from '../../hooks/useDocument';
import { COLLECTIONS } from '../../constants/firestore';
import UserContext from '../../contexts/UserContext';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
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
  drawerPaper: { width: DRAWER_WIDTH },
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
  userWrapper: {
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit / 2,
    cursor: 'default',
  },
  listWrapper: {
    marginTop: theme.spacing.unit * 3,
  },
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
    '& *': { color: theme.palette.primary.main },
  },

  navFab: {
    position: 'fixed',
    top: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    '&:hover': { backgroundColor: theme.palette.background.paper },
  },

  wrappedComponentWrapper: { transition: theme.transitions.create('opacity') },
  fadeOut: { opacity: 0 },
});

export default function withNavigation(WrappedComponent) {
  function WithNavigation(props) {
    const { classes, theme, history, location, authUser } = props;

    setBackground(theme.palette.background.default);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [navOpen, setNavOpen] = useState(false);
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
      if (route !== location.pathname) {
        setFadeOut(true);
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
                    className={classNames(
                      classes.logoButton,
                      selectedRoute === ROUTES.DASHBOARD && classes.selected
                    )}
                  >
                    <img src={logo} alt="2hats" className={classes.logo} />
                  </ButtonBase>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item className={classes.userWrapper}>
                  <User user={user} />
                </Grid>
                <Grid item xs>
                  <List>
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
                <Grid item className={classes.listWrapper}>
                  <List>
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
            <WrappedComponent
              {...props}
              classes={null}
              isMobile={isMobile}
              user={user}
            />
          </Grid>

          {isMobile && (
            <Fab
              onClick={() => {
                setNavOpen(true);
              }}
              className={classes.navFab}
            >
              <MenuIcon />
            </Fab>
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
