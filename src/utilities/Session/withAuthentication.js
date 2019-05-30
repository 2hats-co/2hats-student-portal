import React, { useEffect, useState } from 'react';
import { auth } from '../../store';
import LoadingScreen from '../../components/LoadingScreen';

const withAuthentication = Component => {
  function WithAuthentication(props) {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        setAuthUser(authUser);
        if (loading) setLoading(false);
        setSmartlookUser(authUser);
      });
    }, []);

    const setSmartlookUser = authUser => {
      window.smartlook('identify', authUser.uid, {
        name: authUser.displayName,
        email: authUser.email,
      });
    };

    if (loading) return <LoadingScreen />;

    return <Component authUser={authUser} />;
  }

  return WithAuthentication;
};

export default withAuthentication;
