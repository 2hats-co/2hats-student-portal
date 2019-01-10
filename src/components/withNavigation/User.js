import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import SuperAvatarPlus from '../Avatar';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  avatar: {
    marginBottom: theme.spacing.unit,
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8,
    fontSize: theme.spacing.unit * 4,
  },
});

function User(props) {
  const { classes, className, user } = props;

  if (!user)
    return (
      <div className={className}>
        <CircularProgress />
      </div>
    );
  return (
    <div className={className}>
      <SuperAvatarPlus
        uid={user && user.id}
        firstName={user ? user.firstName : ''}
        lastName={user ? user.lastName : ''}
        avatarURL={user ? user.avatarURL : ''}
      />
      <Typography variant="h6">
        {user && user.firstName} {user && user.lastName}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(User);
