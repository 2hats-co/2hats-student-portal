import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { Theme } from './Theme';

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
import ProtectedRoute from 'components/routing/ProtectedRoute';

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

const App = props => {
  const authUser = useAuth();
  const [userDocState, userDocDispatch] = useDocument({});

  useEffect(() => {
    console.log('authUser', authUser);
    if (authUser && authUser.uid)
      userDocDispatch({ path: `${COLLECTIONS.users}/${authUser.uid}` });
  }, [authUser]);

  if (authUser === undefined) return <LoadingScreen />;

  return (
    <ThemeProvider theme={Theme}>
      <ErrorBoundary>
        <UserContext.Provider value={{ authUser, user: userDocState.doc }}>
          <Router>
            <div className="app">
              <TagTracker />
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Route
                    exact
                    path={[ROUTES.SIGN_UP, ROUTES.SIGN_IN]}
                    component={() => <AuthenticationContainer isPublic />}
                  />
                  <Route
                    exact
                    path={ROUTES.LOG_OUT}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.logout}
                      />
                    )}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.NO_PASSWORD}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.noPassword}
                      />
                    )}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.CREATE_PASSWORD}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.createPassword}
                      />
                    )}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.RESET_PASSWORD}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.resetPassword}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={ROUTES.VALIDATE_EMAIL}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.validateEmail}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={ROUTES.SPEEDY_SIGN_UP}
                    component={() => (
                      <SpeedySignupContainer isPublic authUser={authUser} />
                    )}
                  />
                  <Route
                    exact
                    path={[ROUTES.SMART_LINK, ROUTES.SMART_LINK.toLowerCase()]}
                    component={() => <SmartLinkContainer />}
                  />

                  <ProtectedRoute
                    exact
                    path={ROUTES.DASHBOARD}
                    component={() => <DashboardContainer {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.PROFILE}
                    component={() => <ProfileContainer {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.JOBS}
                    component={() => <JobsContainer {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.ASSESSMENTS}
                    component={() => <AssessmentsContainer {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    path={[ROUTES.ASSESSMENT, ROUTES.JOB]}
                    component={() => <DetailedViewContainer {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    path={ROUTES.COURSES}
                    component={() => <CoursesContainer {...props} />}
                  />

                  <ProtectedRoute
                    exact
                    path={ROUTES.COURSE_REDIRECT}
                    component={() => <CourseRedirectContainer {...props} />}
                  />

                  <ProtectedRoute
                    exact
                    path={ROUTES.SCHEDULER}
                    component={() => <SchedulerContainer {...props} />}
                  />

                  <Route
                    exact
                    path={'/'}
                    component={() => <Landing {...props} />}
                  />
                  <Route component={() => <FourOhFour />} />
                </Switch>
              </Suspense>
            </div>
          </Router>
        </UserContext.Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
