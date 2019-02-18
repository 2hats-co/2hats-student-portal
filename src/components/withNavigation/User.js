import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import SuperAvatarPlus from '../SuperAvatarPlus';

const styles = theme => ({
  root: {
    minHeight: 100,
    userSelect: 'none',
  },

  placeholderAvatar: {
    width: 64,
    height: 64,

    background: theme.palette.divider,
    borderRadius: '50%',

    animation: 'fade-in-out 1.5s infinite',
  },

  '@keyframes fade-in-out': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  },

  displayName: {
    paddingLeft: theme.spacing.unit / 2,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
});

function User(props) {
  const { classes, user } = props;

  if (!user)
    return (
      <div className={classes.root}>
        <div className={classes.placeholderAvatar} />
      </div>
    );
  return (
    <div className={classes.root}>
      <SuperAvatarPlus
        uid={user && user.id}
        firstName={user ? user.firstName : ''}
        lastName={user ? user.lastName : ''}
        avatarURL={user ? user.avatarURL : ''}
      />
      <Typography
        variant="h6"
        style={{ paddingLeft: 4 }}
        className={classes.displayName}
      >
        {user && user.firstName} {user && user.lastName}
      </Typography>
    </div>
  );
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default withStyles(styles)(User);
