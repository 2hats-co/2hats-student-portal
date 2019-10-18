import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Profile from 'components/Profile';
import SettingsPage from 'components/Profile/SettingsPage';
import DeleteAccountPage from 'components/Profile/DeleteAccountPage';
import FourOhFour from 'components/routing/FourOhFour';

import { DocWithId, ProfilesDoc } from '@bit/twohats.common.db-types';
import {
  PROFILE,
  PROFILE_SETTINGS,
  PROFILE_DELETE_ACCOUNT,
} from 'constants/routes';

export interface ProfileComponentProps {
  profileData: DocWithId<ProfilesDoc>;
}

const ProfileContainer: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  switch (location.pathname) {
    case PROFILE_SETTINGS:
      return <SettingsPage />;

    case PROFILE_DELETE_ACCOUNT:
      return <DeleteAccountPage />;

    case PROFILE:
      return <Profile />;

    default:
      return <FourOhFour />;
  }
};

export default ProfileContainer;
