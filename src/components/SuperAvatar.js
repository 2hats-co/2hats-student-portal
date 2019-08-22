import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Tooltip, CircularProgress } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonOutlined';

import { getInitials } from 'utilities';
import { useUser } from 'contexts/UserContext';

const SuperAvatar = ({ className, size, tooltip, noInitialsIcon }) => {
  const { authUser, user } = useUser();

  if (!authUser || !user) return <CircularProgress size={size} />;

  let name;
  if (user.firstName) name = `${user.firstName} ${user.lastName}`;
  else if (authUser.displayName) name = authUser.displayName;
  else if (authUser.givenName)
    name = `${authUser.givenName} ${authUser.familyName}`;

  const avatar = user.avatarURL ? (
    <Avatar
      src={user.avatarURL}
      className={className}
      style={{ width: size, height: size }}
    />
  ) : (
    <Avatar className={className} style={{ width: size, height: size }}>
      {name ? getInitials(name) : noInitialsIcon || <PersonIcon />}
    </Avatar>
  );

  if (tooltip) return <Tooltip title={name}>{avatar}</Tooltip>;
  return avatar;
};

SuperAvatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  tooltip: PropTypes.bool,
  noInitialsIcon: PropTypes.node,
};

export default SuperAvatar;
