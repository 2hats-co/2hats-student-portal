import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { useUser } from 'contexts/UserContext';
import { SIGN_IN } from 'constants/routes';

/**
 * Drop-in replacement for `react-router-dom`’s `<Route>` component.
 * Uses `authUser` in `UserContext` to verify logged in state.
 *
 * If logged in, **renders** the component.
 * Otherwise, **redirects** to `/signin?route=`, where the route URL parameter
 * is the route to redirect to after sign in. This is handled by
 * [`AuthenticationContainer`](#authenticationcontainer).
 *
 * ### Fix for `authUser` not updating before redirect
 *
 * Sometimes, components such as
 * [`SmartLinkContainer`](#smartlinkcontainer) and
 * [`SpeedySignupContainer`](#speedysignupcontainer) might redirect to a different
 * route after they do sign-in. However, `authUser` does not always update
 * immediately, so it may redirect to `/signin?route=` and make the user sign
 * in again, which is undesirable. In the case of resetting password, it
 * becomes unusable. So [`SpeedySignupContainer`](#speedysignupcontainer) and
 * [`AuthenticationContainer`](#authenticationcontainer), on mount, check if
 * `authUser` exists and redirects or shows the correct screen, instead of
 * asking for sign in.
 *
 * This is a more desirable solution than delaying the redirects because
 * `authUser` will update regardless, causing the component to be remounted, and
 * the container state will be lost and the redirect may fail. In the case of
 * [`SmartLinkContainer`](#smartlinkcontainer), it will cause it to call the
 * smartLink callable multiple times, which is undesirable.
 */
const ProtectedRoute: React.FunctionComponent<RouteProps> = ({
  render,
  location,
  ...rest
}) => {
  const { authUser } = useUser();

  if (!location) throw new Error('ProtectedRoute location is undefined');

  let redirectRoute = SIGN_IN;
  if (location.pathname)
    redirectRoute += `?route=${encodeURIComponent(
      location.pathname + location.search + location.hash
    )}`;

  if (!authUser)
    return <Route {...rest} render={() => <Redirect to={redirectRoute} />} />;

  return <Route {...rest} render={render} />;
};

export default ProtectedRoute;
