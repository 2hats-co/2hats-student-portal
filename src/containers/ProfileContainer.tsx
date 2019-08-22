import React, { useEffect } from 'react';

import { Container } from '@material-ui/core';

import LoadingScreen from 'components/LoadingScreen';
import ProfileHeader from 'components/Profile/ProfileHeader';

import { useUser } from 'contexts/UserContext';
import useDocument from 'hooks/useDocument';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { DocWithId, ProfilesDoc } from '@bit/twohats.common.db-types';

export interface ProfileComponentProps {
  profileData: DocWithId<ProfilesDoc>;
}

interface IProfileContainerProps {}

const ProfileContainer: React.FunctionComponent<
  IProfileContainerProps
> = props => {
  const { user } = useUser();
  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profileData = profileState.doc;

  useEffect(() => {
    document.title = 'Profile – 2hats';
  }, []);

  if (profileState.loading)
    return <LoadingScreen message="Getting your data…" contained />;
  if (!profileData) throw `Profile data for ${user.id} is empty`;

  return (
    <Container maxWidth="sm" component="main">
      <ProfileHeader profileData={profileData} />
    </Container>
  );
};

export default ProfileContainer;
