import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaqIcon from '@material-ui/icons/HelpOutline';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import logo from 'assets/images/Logo/DarkText.svg';
import SuperAvatar from 'components/SuperAvatar';

import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(theme => ({
  topAppBar: {
    transition:
      theme.transitions.create('all', {
        duration: theme.transitions.duration.short,
      }) + ' !important',
  },
  shadow: {
    boxShadow: theme.shadowsLight[4],
  },
  topToolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
  },
  logo: {
    height: 30,
    userSelect: 'none',
    userDrag: 'none',
    cursor: 'pointer',
  },
  avatarButton: { padding: 0, width: 48, height: 48 },
}));

const MobileTopBar = ({ triggerHide, triggerElevation }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Slide appear={false} direction="down" in={!triggerHide}>
        <AppBar
          position="fixed"
          color="inherit"
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
              <Grid
                item
                className={classes.logo}
                component={Link}
                to={ROUTES.DASHBOARD}
              >
                <img src={logo} alt="2hats" className={classes.logo} />
              </Grid>

              <Grid item>
                <IconButton
                  className={classes.avatarButton}
                  component={Link}
                  to={ROUTES.PROFILE}
                >
                  <SuperAvatar size={32} />
                </IconButton>
                <IconButton onClick={e => setAnchorEl(e.target)}>
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

MobileTopBar.propTypes = {
  /** Hook value from `MobileNavigation` */
  triggerHide: PropTypes.bool.isRequired,
  /** Hook value from `MobileNavigation` */
  triggerElevation: PropTypes.bool.isRequired,
};

export default MobileTopBar;
