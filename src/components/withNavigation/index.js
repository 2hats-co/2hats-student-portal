import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/Person';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import AssessmentsIcon from '@material-ui/icons/Assignment';
import EducationIcon from '@material-ui/icons/School';

import ContactIcon from '@material-ui/icons/Forum';
import FaqIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import SignOutIcon from '@material-ui/icons/ExitToApp';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { setBackground } from '../../utilities/styling';
import ROUTES from '../../constants/routes';

import logo from '../../assets/images/Logo/DarkText.svg';
import User from './User';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
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
  nav: {
    height: '100%',
  },

  logoButton: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    transition: theme.transitions.create('background-color'),
    transitionLength: theme.transitions.duration.shortest,
    '&:hover': { backgroundColor: theme.palette.action.hover },
  },
  logo: {
    width: 100,
  },
  userWrapper: {
    padding: theme.spacing.unit * 2,
  },
  listWrapper: {
    marginTop: theme.spacing.unit * 3,
  },
  listItemTextRoot: {
    padding: 0,
  },
  divider: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },

  navFab: {
    position: 'absolute',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
  },
});

const MAIN_NAV_ITEMS = [
  { label: 'Profile', icon: <ProfileIcon /> },
  { label: 'Jobs', icon: <JobsIcon /> },
  { label: 'Assessments', icon: <AssessmentsIcon /> },
  { label: 'Education', icon: <EducationIcon /> },
];
const BOTTOM_NAV_ITEMS = [
  { label: 'Contact Us', icon: <ContactIcon /> },
  { label: 'FAQ', icon: <FaqIcon /> },
  { label: 'Divider' },
  { label: 'Settings', icon: <SettingsIcon /> },
  { label: 'Sign out', icon: <SignOutIcon /> },
];

export default function withNavigation(WrappedComponent) {
  function WithNavigation(props) {
    const { classes, theme, history, location } = props;

    setBackground(theme.palette.background.default);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [navOpen, setNavOpen] = useState(false);

    const goTo = route => () => {
      history.push(route);
    };
    const path = location.pathname;

    return (
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
              <Grid item>
                <ButtonBase
                  onClick={goTo(ROUTES.dashboard)}
                  className={classes.logoButton}
                >
                  <img src={logo} alt="2hats" className={classes.logo} />
                </ButtonBase>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item className={classes.userWrapper}>
                <User name="Rachel Mundo" avatarURL="" />
              </Grid>
              <Grid item xs className={classes.listWrapper}>
                <List>
                  {MAIN_NAV_ITEMS.map((x, i) => (
                    <ListItem button key={x.label} onClick={goTo(x.route)}>
                      <ListItemIcon>{x.icon}</ListItemIcon>
                      <ListItemText
                        primary={x.label}
                        classes={{ root: classes.listItemTextRoot }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item className={classes.listWrapper}>
                <List>
                  {BOTTOM_NAV_ITEMS.map((x, i) =>
                    x.label === 'Divider' ? (
                      <Divider className={classes.divider} />
                    ) : (
                      <ListItem
                        button
                        key={x.label}
                        onClick={x.onClick ? x.onClick : goTo(x.route)}
                      >
                        <ListItemIcon>{x.icon}</ListItemIcon>
                        <ListItemText
                          primary={x.label}
                          classes={{ root: classes.listItemTextRoot }}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>

        <Grid item xs>
          <WrappedComponent {...props} classes={null} isMobile={isMobile} />
          {isMobile && (
            <Fab
              onClick={() => {
                setNavOpen(true);
              }}
              color="primary"
              className={classes.navFab}
            >
              <MenuIcon />
            </Fab>
          )}
        </Grid>
      </Grid>
    );
  }

  return withRouter(withStyles(styles, { withTheme: true })(WithNavigation));
}
