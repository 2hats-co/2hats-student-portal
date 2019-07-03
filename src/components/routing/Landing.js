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
  const { authUser } = userContext;

  return <Redirect to={authUser ? ROUTES.DASHBOARD : ROUTES.SIGN_IN} />;
};

export default Landing;
