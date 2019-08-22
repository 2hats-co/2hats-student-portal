import React from 'react';
import { Redirect } from 'react-router-dom';

import LoadingScreen from 'components/LoadingScreen';

import { useUser } from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';
import { hasFinishedOnboarding } from 'utilities/onboarding';

/**
 * **Redirects** users to [`/dashboard`](#section-dashboard) or
 * [`/signin`](#authenticationcontainer), depending on logged in state
 * based on `authUser` in `UserContext`.
 *
 * Will wait for the user document to be loaded. If the user has not been
 * onboarded yet or has not finished onboarding, they will be redirected there.
 */
const Landing: React.FC = () => {
  const { authUser, user } = useUser();

  if (!authUser) return <Redirect to={ROUTES.SIGN_IN} />;

  if (!user) return <LoadingScreen message="Getting your data…" />;
  if (!user.onboardingStage || !hasFinishedOnboarding(user.onboardingStage))
    return <Redirect to={ROUTES.ONBOARDING} />;

  return <Redirect to={authUser ? ROUTES.DASHBOARD : ROUTES.SIGN_IN} />;
};

export default Landing;
