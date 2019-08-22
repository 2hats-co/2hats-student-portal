import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import AvatarUploader from './AvatarUploader';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { useUser } from 'contexts/UserContext';

interface IProfileHeaderProps extends ProfileComponentProps {}

const ProfileHeader: React.FunctionComponent<IProfileHeaderProps> = props => {
  const { user } = useUser();

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item>
        <AvatarUploader />
      </Grid>
      <Grid item xs>
        <Typography variant="overline" component="p" gutterBottom>
          Email (Username)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
