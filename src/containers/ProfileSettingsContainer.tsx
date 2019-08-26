import React, { useEffect } from 'react';

import { Container } from '@material-ui/core';

import { useUser } from 'contexts/UserContext';
import { DocWithId, ProfilesDoc } from '@bit/twohats.common.db-types';

export interface ProfileComponentProps {
  profileData: DocWithId<ProfilesDoc>;
}

interface IProfileSettingsContainerProps {}

const ProfileSettingsContainer: React.FunctionComponent<
  IProfileSettingsContainerProps
> = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = 'Settings – 2hats';
  }, []);

  return (
    <Container maxWidth="sm" component="main">
      SETTINGS
    </Container>
  );
};

export default ProfileSettingsContainer;
