import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  useTheme,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
  Fade,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaqIcon from '@material-ui/icons/HelpOutline';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import SuperAvatar from 'components/SuperAvatar';
import BackButton from '../BackButton';

import * as ROUTES from 'constants/routes';
import { HistoryContext } from 'contexts/HistoryContext';
import { hideBackButton } from 'utilities/routing';
import { getBaseRoute } from 'utilities/routing';

const useStyles = makeStyles(theme =>
  createStyles({
    topAppBar: {
      backgroundColor: theme.palette.background.default,
      transition:
        theme.transitions.create('all', {
          duration: theme.transitions.duration.short,
        }) + ' !important',
      // Stay below cards when not scrolled down:
      zIndex: 'auto',
      padding:
        'env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left)',
    },
    shadow: {
      backgroundColor: theme.palette.background.elevation[4],
      boxShadow: theme.shadowsLight[4],
      // Default behaviour:
      zIndex: theme.zIndex.appBar,
    },
    topToolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0.5),
      [theme.breakpoints.up('sm')]: { paddingLeft: theme.spacing(2) },
    },
    logo: {
      width: 84,
      height: 30,
      userSelect: 'none',
      userDrag: 'none',
      cursor: 'pointer',
    },

    avatarButton: {
      padding: 0,
      width: 48,
      height: 48,
    },
    avatarButtonColorPrimary: {
      '& $avatar': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${
          theme.palette.primary.main
        }`,
      },
    },
    avatar: { fontSize: '1rem' },
  })
);

interface IMobileTopBarProps extends RouteComponentProps {
  /** Hook value from `MobileNavigation` */
  triggerHide: boolean;
  /** Hook value from `MobileNavigation` */
  triggerElevation: boolean;
}

const MobileTopBar: React.FunctionComponent<IMobileTopBarProps> = ({
  location,
  triggerHide,
  triggerElevation,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);

  const historyStack = useContext(HistoryContext);
  const showLogo = hideBackButton(historyStack, location);

  return (
    <>
      <Slide appear={false} direction="down" in={!triggerHide}>
        <AppBar
          position="fixed"
          color="default"
          classes={{
            root: clsx(classes.topAppBar, triggerElevation && classes.shadow),
          }}
          elevation={0}
        >
          <Toolbar classes={{ root: classes.topToolbar }}>
            <Grid
              container
              wrap="nowrap"
              justify="space-between"
              alignItems="center"
            >
              {showLogo ? (
                <Grid
                  item
                  className={classes.logo}
                  component={Link}
                  to={ROUTES.DASHBOARD}
                >
                  <Fade in>
                    <img
                      src={theme.assets.logo}
                      alt="2hats"
                      className={classes.logo}
                    />
                  </Fade>
                </Grid>
              ) : (
                <BackButton isMobile={true} />
              )}

              <Grid item>
                <IconButton
                  classes={{
                    root: classes.avatarButton,
                    colorPrimary: classes.avatarButtonColorPrimary,
                  }}
                  className={classes.avatarButton}
                  component={Link}
                  to={ROUTES.PROFILE}
                  color={
                    getBaseRoute(location.pathname) === ROUTES.PROFILE
                      ? 'primary'
                      : 'default'
                  }
                  id="mobilenav-profile"
                >
                  <SuperAvatar size={32} className={classes.avatar} />
                </IconButton>
                <IconButton
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    setAnchorEl(event.currentTarget)
                  }
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component="a"
          href="https://www.2hats.com.au/faq-for-students"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon>
            <FaqIcon />
          </ListItemIcon>
          FAQ
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={ROUTES.LOG_OUT}>
          <ListItemIcon>
            <LogOutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(MobileTopBar);
