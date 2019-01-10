import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import SuperAvatar from '../SuperAvatar';

const styles = theme => ({
  avatar: {
    marginBottom: theme.spacing.unit,
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8,
    fontSize: theme.spacing.unit * 4,
  },
});

function User(props) {
  const { classes, name, avatarURL } = props;

  return (
    <div>
      <SuperAvatar
        className={classes.avatar}
        data={{ avatarURL, displayName: name }}
      />
      <Typography variant="h6">{name}</Typography>
    </div>
  );
}

export default withStyles(styles)(User);
