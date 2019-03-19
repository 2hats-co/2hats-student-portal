import React, { useState, Suspense, lazy } from 'react';
// material UI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Theme } from './Theme';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
import UserContext from './contexts/UserContext';
//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { AUTHENTICATION_CONTAINER } from './constants/views';
import Landing from './components/Landing';
import TagTracker from './components/TagTracker';
import ErrorBoundary from './components/ErrorBoundary';
import FourOhFour from './components/FourOhFour';

import LoadingScreen from './components/LoadingScreen';
const DetailedViewContainer = lazy(() =>
  import('./containers/DetailedViewContainer' /* webpackChunkName: "DetailedViewContainer" */)
);

const AuthenticationContainer = lazy(() =>
  import('./containers/AuthenticationContainer' /* webpackChunkName: "AuthenticationContainer" */)
);
const SpeedySignupContainer = lazy(() =>
  import('./containers/SpeedySignupContainer' /* webpackChunkName: "SpeedySignupContainer" */)
);

const SmartLinkContainer = lazy(() =>
  import('./containers/SmartLinkContainer' /* webpackChunkName: "SmartLinkContainer" */)
);

const DashboardContainer = lazy(() =>
  import('./containers/DashboardContainer' /* webpackChunkName: "DashboardContainer" */)
);
const ProfileContainer = lazy(() =>
  import('./containers/ProfileContainer' /* webpackChunkName: "ProfileContainer" */)
);
const JobsContainer = lazy(() =>
  import('./containers/JobsContainer' /* webpackChunkName: "JobsContainer" */)
);
const AssessmentsContainer = lazy(() =>
  import('./containers/AssessmentsContainer' /* webpackChunkName: "AssessmentsContainer" */)
);
const CoursesContainer = lazy(() =>
  import('./containers/CoursesContainer' /* webpackChunkName: "CoursesContainer" */)
);
const CourseRedirectContainer = lazy(() =>
  import('./containers/CourseRedirectContainer' /* webpackChunkName: "CourseRedirectContainer" */)
);
const SchedulerContainer = lazy(() =>
  import('./containers/SchedulerContainer' /* webpackChunkName: "SchedulerContainer" */)
);

const App = props => {
  const [user, setUser] = useState(null);

  return (
    <MuiThemeProvider theme={Theme}>
      <UserContext.Provider
        value={{ user: user, setUser: user => setUser(user) }}
      >
        <Router>
          <ErrorBoundary>
            <div className="app">
              <TagTracker />
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Route
                    exact
                    path={ROUTES.SIGN_UP}
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
                  <Route
                    exact
                    path={ROUTES.SIGN_IN}
                    component={() => <AuthenticationContainer isPublic />}
                  />
                  <Route
                    exact
                    path={ROUTES.NO_PASSWORD}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.noPassword}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={ROUTES.CREATE_PASSWORD}
                    component={() => (
                      <AuthenticationContainer
                        isPublic
                        view={AUTHENTICATION_CONTAINER.createPassword}
                      />
                    )}
                  />
                  <Route
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
                    component={() => <SpeedySignupContainer isPublic />}
                  />
                  <Route
                    exact
                    path={ROUTES.SMART_LINK}
                    component={() => <SmartLinkContainer />}
                  />
                  <Route
                    exact
                    path={'/smartlinks'}
                    component={() => <SmartLinkContainer />}
                  />
                  <Route
                    exact
                    path={ROUTES.DASHBOARD}
                    component={() => <DashboardContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.PROFILE}
                    component={() => <ProfileContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.JOBS}
                    component={() => <JobsContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.ASSESSMENTS}
                    component={() => <AssessmentsContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.ASSESSMENT}
                    component={() => <DetailedViewContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.JOB}
                    component={() => <DetailedViewContainer {...props} />}
                  />
                  <Route
                    exact
                    path={ROUTES.COURSES}
                    component={() => <CoursesContainer {...props} />}
                  />

                  <Route
                    exact
                    path={ROUTES.COURSE_REDIRECT}
                    component={() => <CourseRedirectContainer {...props} />}
                  />

                  <Route
                    exact
                    path={ROUTES.SCHEDULER}
                    component={() => <SchedulerContainer {...props} />}
                  />

                  <Route exact path="/linkedin" component={LinkedInPopUp} />
                  <Route
                    exact
                    path={'/'}
                    component={() => <Landing {...props} />}
                  />
                  <Route component={() => <FourOhFour />} />
                </Switch>
              </Suspense>
            </div>
          </ErrorBoundary>
        </Router>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
};

export default withAuthentication(App);
