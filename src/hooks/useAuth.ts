import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import ReactGA from 'react-ga';

/**
 * Add smartlook to window object to appease TypeScript compiler
 */
declare global {
  interface Window {
    smartlook: any;
  }
}

/**
 * Authenticates user using Firebase Auth. For use in [App](#app) component.
 * @returns {(undefined | null | object)} undefined if loading, null if not
 * signed in, or object for user auth object
 *
 * Plus, it registers the user against Smartlook
 */
const useAuth = () => {
  const [authUser, setAuthUser] = useState<undefined | null | firebase.User>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser);
      if (authUser) {
        setSmartlookUser(authUser);
        ReactGA.set({ userId: authUser.uid });
        console.log('Signed in', authUser.uid, authUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const setSmartlookUser = (authUser: firebase.User) => {
    window.smartlook('identify', authUser.uid, {
      name: authUser.displayName,
      email: authUser.email,
    });
  };

  return authUser;
};

export default useAuth;
