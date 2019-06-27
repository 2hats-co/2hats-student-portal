import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { Theme, DarkTheme } from './Theme';
import { CssBaseline, useMediaQuery } from '@material-ui/core';

import useAuth from 'hooks/useAuth';
import useDocument from 'hooks/useDocument';
import UserContext from 'contexts/UserContext';

import * as ROUTES from 'constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

import Landing from 'components/routing/Landing';
import TagTracker from 'components/TagTracker';
import ErrorBoundary from 'components/ErrorBoundary';
import FourOhFour from 'components/routing/FourOhFour';
import LoadingScreen from 'components/LoadingScreen';
import Navigation from 'components/Navigation';
import ProtectedRoute from 'components/routing/ProtectedRoute';

import { HistoryProvider } from 'contexts/HistoryContext';

import { AUTHENTICATION_CONTAINER } from 'constants/views';
const DetailedViewContainer = lazy(() =>
  import(
    'containers/DetailedViewContainer' /* webpackChunkName: "DetailedViewContainer" */
  )
);
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
const DashboardContainer = lazy(() =>
  import(
    'containers/DashboardContainer' /* webpackChunkName: "DashboardContainer" */
  )
);
const ProfileContainer = lazy(() =>
  import(
    'containers/ProfileContainer' /* webpackChunkName: "ProfileContainer" */
  )
);
const JobsContainer = lazy(() =>
  import('containers/JobsContainer' /* webpackChunkName: "JobsContainer" */)
);
const AssessmentsContainer = lazy(() =>
  import(
    'containers/AssessmentsContainer' /* webpackChunkName: "AssessmentsContainer" */
  )
);
const CoursesContainer = lazy(() =>
  import(
    'containers/CoursesContainer' /* webpackChunkName: "CoursesContainer" */
  )
);
const CourseRedirectContainer = lazy(() =>
  import(
    'containers/CourseRedirectContainer' /* webpackChunkName: "CourseRedirectContainer" */
  )
);
const SchedulerContainer = lazy(() =>
  import(
    'containers/SchedulerContainer' /* webpackChunkName: "SchedulerContainer" */
  )
);

const App = () => {
  const authUser = useAuth();
  const [userDocState, userDocDispatch] = useDocument({});

  useEffect(() => {
    console.log('authUser', authUser);
    if (authUser && authUser.uid)
      userDocDispatch({ path: `${COLLECTIONS.users}/${authUser.uid}` });
  }, [authUser]);

  const prefersDark = useMediaQuery('@media (prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const theme = prefersDark ? DarkTheme : Theme;
  console.log('theme', prefersDark, theme);

  if (authUser === undefined)
    return (
      <ThemeProvider theme={theme}>
        <LoadingScreen />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <UserContext.Provider value={{ authUser, user: userDocState.doc }}>
          <Router>
            <HistoryProvider>
              <div className="app">
                <TagTracker />
                <Suspense fallback={<LoadingScreen />}>
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
                      path={ROUTES.ONBOARDING}
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
                      path={ROUTES.PROFILE}
                      render={props => (
                        <Navigation>
                          <ProfileContainer {...props} />
                        </Navigation>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.JOBS}
                      render={props => (
                        <Navigation>
                          <JobsContainer {...props} />
                        </Navigation>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.ASSESSMENTS}
                      render={props => (
                        <Navigation>
                          <AssessmentsContainer {...props} />
                        </Navigation>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={[ROUTES.ASSESSMENT, ROUTES.JOB]}
                      render={props => (
                        <Navigation>
                          <DetailedViewContainer {...props} />
                        </Navigation>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.COURSES}
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

                    <ProtectedRoute
                      exact
                      path={ROUTES.SCHEDULER}
                      render={props => (
                        <Navigation>
                          <SchedulerContainer {...props} />
                        </Navigation>
                      )}
                    />

                    <Route
                      exact
                      path={'/'}
                      render={props => <Landing {...props} />}
                    />
                    <Route render={props => <FourOhFour />} />
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
