import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';

/**
 * **Redirects** users to [`/dashboard`](#section-dashboard) or
 * [`/signin`](#authenticationcontainer), depending on logged in state
 * based on `authUser` in `UserContext`.
 */
const Landing = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return <Redirect to={user ? ROUTES.DASHBOARD : ROUTES.SIGN_IN} />;
};

export default Landing;
