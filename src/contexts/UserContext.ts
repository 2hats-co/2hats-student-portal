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
  /** Firebase Authentication user data */
  authUser?: undefined | null | firebase.User;
  /** UID from Firebase Auth */
  UID?: firebase.User['uid'] | null;
  /** User document from listener */
  user?: DocWithId<UsersDoc>;
  /** Profile document from listener */
  profile?: DocWithId<ProfilesDoc>;
  /**
   * Global location setting for viewing jobs. Set in `JobsContainer`.
   * [See `LocationFilter` for more info.](#locationfilter)
   */
  jobLocation?: { city: string; country: string };
  /** Global function to update global location setting */
  setJobLocation?: (location: { city: string; country: string }) => void;
};

const UserContext = React.createContext<UserContextType>({});
export default UserContext;

export const useUser = () => useContext(UserContext);
