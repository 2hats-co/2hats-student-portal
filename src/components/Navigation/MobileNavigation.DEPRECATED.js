import React from 'react';
import PropTypes from 'prop-types';

// appBar: {
//   top: 'auto !important',
//   bottom: 0,

//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.secondary,
//   boxShadow: `0 -1px 0 rgba(0,0,0,.05), ${theme.shadows[16]}`,

//   '@media print': { display: 'none' },
// },
// toolbar: {
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: `0 ${theme.spacing(1)}px`,
// },
// bottomLogo: {
//   height: 28,
//   opacity: 0.5,
//   userSelect: 'none',
//   userDrag: 'none',
//   cursor: 'pointer',
// },
// avatarButton: { padding: 0, width: 48, height: 48 },
// avatar: { width: 32, height: 32 },

const MobileNavigation = props => {
  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          id="mobile-nav-drawer"
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
          onClick={() => {
            history.push(ROUTES.DASHBOARD);
          }}
        />

        <IconButton
          color="inherit"
          onClick={() => {
            setNavOpen(true);
          }}
          className={classes.avatarButton}
        >
          <SuperAvatar data={user || {}} className={classes.avatar} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MobileNavigation;
