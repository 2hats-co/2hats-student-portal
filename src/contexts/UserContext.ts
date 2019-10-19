import React, { useContext } from 'react';
import { DocWithId, UsersDoc, ProfilesDoc } from '@bit/twohats.common.db-types';

/**
 * Note that **all** of the properties in this type can be `undefined`.
 * This represents the initial state of the app, when the user has not signed
 * in and Firebase Auth has not been initialised.
 *
 * During the start of the app’s runtime, each component rendered must check
 * if any of these properties are undefined when accessing from context.
 *
 * Some utility/global components used will make sure these exist by showing
 * [`LoadingScreen`](#loadingscreen) beforehand. These include:
 *
 * - [`ProtectedRoute`](#protectedroute): `authUser` and `UID`
 * - [`Navigation`](#navigation): `user` and `profile`
 *
 * If a component is rendered inside these components or after the user has
 * gone through a flow that has rendered these components, you should be
 * safe to assert that these properties are not null using
 * TypeScript’s `!` postfix operator, e.g. `user!`.
 *
 * See the [TypeScript 2.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
 * for more details.
 */
type UserContextType = {
  authUser?: undefined | null | firebase.User;
  UID?: firebase.User['uid'] | null;
  user?: DocWithId<UsersDoc>;
  profile?: DocWithId<ProfilesDoc>;
};

const UserContext = React.createContext<UserContextType>({});
export default UserContext;

export const useUser = () => useContext(UserContext);
