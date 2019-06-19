import { useEffect, useState } from 'react';
import { auth } from '../firebase';

/**
 * Authenticates user using Firebase Auth. For use in [App](#app) component.
 * @returns {(undefined | null | object)} undefined if loading, null if not
 * signed in, or object for user auth object
 */
const useAuth = () => {
  const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser);
      if (authUser) setSmartlookUser(authUser);
    });
  }, []);

  const setSmartlookUser = authUser => {
    window.smartlook('identify', authUser.uid, {
      name: authUser.displayName,
      email: authUser.email,
    });
  };

  return authUser;
};

export default useAuth;