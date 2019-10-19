import React, { useContext } from 'react';
import { DocWithId, UsersDoc, ProfilesDoc } from '@bit/twohats.common.db-types';

type UserContextType = {
  authUser?: undefined | null | firebase.User;
  UID?: firebase.User['uid'] | null;
  user?: DocWithId<UsersDoc>;
  profile?: DocWithId<ProfilesDoc>;
};

const UserContext = React.createContext<UserContextType>({});
export default UserContext;

export const useUser = () => useContext(UserContext);
