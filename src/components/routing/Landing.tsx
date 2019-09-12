import React from 'react';
import queryString from 'query-string';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';

import LoadingScreen from 'components/LoadingScreen';

import { useUser } from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';
import { hasFinishedOnboarding } from 'utilities/onboarding';

/**
 * **Redirects** users to:
 * - [`/signin`](#authenticationcontainer) depending on logged in state
 *   based on `authUser` in `UserContext`, or
 * - [`/welcome` (onboarding)](#onboarding) if the user has not been onboarded, or
 * - [`/dashboard`](#section-dashboard)
 *
 * Will wait for the user document to be loaded. If the user has not been
 * onboarded yet or has not finished onboarding, they will be redirected there.
 *
 * ### Redirect route
 *
 * If the user was redirected to onboarding or auth, it will append the original
 * route the user was meant to see as a URL query parameter, `route`. It is
 * up to the redirect route to handle going to the original route once the
 * action (auth or onboarding) is done.
 */
const Landing: React.FC<RouteComponentProps> = ({ location }) => {
  const { authUser, user } = useUser();

  const parsedQuery = queryString.parse(location.search);
  const redirectRoute =
    typeof parsedQuery.route === 'string' && parsedQuery.route.length > 0
      ? parsedQuery.route
      : '';
  const appendedRoute = redirectRoute
    ? `?route=${encodeURIComponent(redirectRoute)}`
    : '';

  if (!authUser) return <Redirect to={ROUTES.SIGN_IN + appendedRoute} />;

  if (!user) return <LoadingScreen message="Getting your data…" />;
  if (!user.onboardingStage || !hasFinishedOnboarding(user.onboardingStage))
    return <Redirect to={ROUTES.ONBOARDING + appendedRoute} />;

  return (
    <Redirect
      to={
        authUser // If signed in
          ? redirectRoute // If there is a redirect route
            ? redirectRoute
            : ROUTES.DASHBOARD // If not, go to dashboard
          : ROUTES.SIGN_IN + appendedRoute
      }
    />
  );
};

export default withRouter(Landing);
