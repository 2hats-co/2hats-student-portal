import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import SuperAvatarPlus from '../Avatar';
import { CircularProgress } from '@material-ui/core';

function User(props) {
  const { className, user } = props;

  if (!user)
    return (
      <div className={className}>
        <CircularProgress size={64} />
      </div>
    );
  return (
    <Fade in>
      <div className={className}>
        <SuperAvatarPlus
          uid={user && user.id}
          firstName={user ? user.firstName : ''}
          lastName={user ? user.lastName : ''}
          avatarURL={user ? user.avatarURL : ''}
        />
        <Typography variant="h6" style={{ paddingLeft: 4 }}>
          {user && user.firstName} {user && user.lastName}
        </Typography>
      </div>
    </Fade>
  );
}

User.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default User;