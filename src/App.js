import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureAnchors } from 'react-scrollable-anchor';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, DarkTheme, useGlobalStyles } from './Theme';
import { CssBaseline, useMediaQuery } from '@material-ui/core';

import useAuth from 'hooks/useAuth';
import useDocument from 'hooks/useDocument';
import UserContext from 'contexts/UserContext';

import * as ROUTES from 'constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';

import Landing from 'components/routing/Landing';
import TagTracker from 'components/TagTracker';
import ErrorBoundary from 'components/ErrorBoundary';
import FourOhFour from 'components/routing/FourOhFour';
import LoadingScreen from 'components/LoadingScreen';
import Navigation from 'components/Navigation';
import ProtectedRoute from 'components/routing/ProtectedRoute';
import CompletedRegistrationTracker from './components/CompletedRegistrationTracker';

import { HistoryProvider } from 'contexts/HistoryContext';

import { AUTHENTICATION_CONTAINER } from 'constants/views';

import DashboardContainer from 'containers/DashboardContainer';
import AssessmentsContainer from 'containers/AssessmentsContainer';
import JobsContainer from 'containers/JobsContainer';
import CoursesContainer from 'containers/CoursesContainer';
import CourseRedirectContainer from 'containers/CourseRedirectContainer';
import DetailedViewContainer from 'containers/DetailedViewContainer';
import ProfileContainer from 'containers/ProfileContainer';

const AuthenticationContainer = lazy(() =>
  import(
    'containers/AuthenticationContainer' /* webpackChunkName: "AuthenticationContainer" */
  )
);
const SpeedySignupContainer = lazy(() =>
  import(
    'containers/SpeedySignupContainer' /* webpackChunkName: "SpeedySignupContainer" */
  )
);
const SmartLinkContainer = lazy(() =>
  import(
    'containers/SmartLinkContainer' /* webpackChunkName: "SmartLinkContainer" */
  )
);
const OnboardingContainer = lazy(() =>
  import(
    'containers/OnboardingContainer' /* webpackChunkName: "OnboardingContainer" */
  )
);

// Configure ScrollableAnchors to have a top offset so nothing gets cut off
configureAnchors({ offset: -50 });

const App = () => {
  const authUser = useAuth();
  const [userDocState, userDocDispatch] = useDocument({});
  const [profileDocState, profileDocDispatch] = useDocument({});

  useGlobalStyles();

  useEffect(() => {
    if (!authUser || !authUser.uid) return;
    userDocDispatch({ path: `${COLLECTIONS.users}/${authUser.uid}` });
    profileDocDispatch({ path: `${COLLECTIONS.profiles}/${authUser.uid}` });
  }, [authUser, userDocDispatch, profileDocDispatch]);

  const prefersDark = useMediaQuery('@media (prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const theme = prefersDark ? DarkTheme : Theme;

  if (authUser === undefined)
    return (
      <ThemeProvider theme={theme}>
        <LoadingScreen message="Signing you in…" />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <UserContext.Provider
          value={{
            authUser,
            UID: authUser ? authUser.uid : null,
            user: userDocState.doc,
            profile: profileDocState.doc,
          }}
        >
          <Router>
            <HistoryProvider>
              <div className="app">
                <TagTracker />
                <CompletedRegistrationTracker />
                <Suspense
                  fallback={<LoadingScreen message="Reticulating splines…" />}
                >
                  <Switch>
                    <Route
                      exact
                      path={[ROUTES.SIGN_UP, ROUTES.SIGN_IN]}
                      render={props => (
                        <AuthenticationContainer isPublic {...props} />
                      )}
                    />
                    <Route
                      exact
                      path={ROUTES.LOG_OUT}
                      render={props => (
                        <AuthenticationContainer
                          isPublic
                          view={AUTHENTICATION_CONTAINER.logout}
                          {...props}
                        />
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.NO_PASSWORD}
                      render={props => (
                        <AuthenticationContainer
                          isPublic
                          view={AUTHENTICATION_CONTAINER.noPassword}
                          {...props}
                        />
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.CREATE_PASSWORD}
                      render={props => (
                        <AuthenticationContainer
                          isPublic
                          view={AUTHENTICATION_CONTAINER.createPassword}
                          {...props}
                        />
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.RESET_PASSWORD}
                      render={props => (
                        <AuthenticationContainer
                          isPublic
                          view={AUTHENTICATION_CONTAINER.resetPassword}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={ROUTES.VALIDATE_EMAIL}
                      render={props => (
                        <AuthenticationContainer
                          isPublic
                          view={AUTHENTICATION_CONTAINER.validateEmail}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={ROUTES.SPEEDY_SIGN_UP}
                      render={props => (
                        <SpeedySignupContainer
                          isPublic
                          authUser={authUser}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={[
                        ROUTES.SMART_LINK,
                        ROUTES.SMART_LINK.toLowerCase(),
                      ]}
                      render={props => <SmartLinkContainer {...props} />}
                    />

                    <ProtectedRoute
                      exact
                      path={[ROUTES.ONBOARDING, ROUTES.ONBOARDING + '/:stage']}
                      render={props => <OnboardingContainer {...props} />}
                    />

                    <ProtectedRoute
                      exact
                      path={ROUTES.DASHBOARD}
                      render={props => (
                        <Navigation>
                          <DashboardContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path={[ROUTES.PROFILE, ROUTES.PROFILE + '/:subroute']}
                      render={props => (
                        <Navigation>
                          <ProfileContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path={[ROUTES.JOBS, ROUTES.JOBS + '/:filter']}
                      render={props => (
                        <Navigation>
                          <JobsContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path={[
                        ROUTES.ASSESSMENTS,
                        ROUTES.ASSESSMENTS + '/:filter',
                      ]}
                      render={props => (
                        <Navigation>
                          <AssessmentsContainer {...props} />
                        </Navigation>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={[
                        ROUTES.ASSESSMENT,
                        ROUTES.ASSESSMENT + '/:id',
                        ROUTES.JOB,
                        ROUTES.JOB + '/:id',
                        ROUTES.JOB + '/:id' + ROUTES.JOB_APPLICATION,
                      ]}
                      render={props => (
                        <Navigation>
                          <DetailedViewContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path={[ROUTES.COURSES, ROUTES.COURSES + '/:filter']}
                      render={props => (
                        <Navigation>
                          <CoursesContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path={ROUTES.COURSE_REDIRECT}
                      render={props => (
                        <Navigation>
                          <CourseRedirectContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <Route
                      exact
                      path={'/'}
                      render={props => <Landing {...props} />}
                    />

                    <Route render={props => <FourOhFour {...props} />} />
                  </Switch>
                </Suspense>
              </div>
            </HistoryProvider>
          </Router>
        </UserContext.Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
