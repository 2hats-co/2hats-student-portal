import React, { Component } from 'react';
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

import { CLOUD_FUNCTIONS, cloudFunction } from './utilities/CloudFunctions';
// loadable
import Loadable from 'react-loadable';
import LoadingScreen from './components/LoadingScreen';

const AuthenticationContainer = Loadable({
  loader: () => import('./containers/AuthenticationContainer'),
  loading() {
    return <LoadingScreen />;
  },
});
const SignupContainer = Loadable({
  loader: () => import('./containers/SignupContainer'),
  loading() {
    return <LoadingScreen />;
  },
});
const SpeedySignupContainer = Loadable({
  loader: () => import('./containers/SpeedySignupContainer'),
  loading() {
    return <LoadingScreen />;
  },
});
const SmartLinkContainer = Loadable({
  loader: () => import('./containers/SmartLinkContainer'),
  loading() {
    return <LoadingScreen />;
  },
});

const DashboardContainer = Loadable({
  loader: () => import('./containers/DashboardContainer'),
  loading() {
    return <LoadingScreen showNav />;
  },
});
const ProfileContainer = Loadable({
  loader: () => import('./containers/ProfileContainer'),
  loading() {
    return <LoadingScreen showNav />;
  },
});
const JobsContainer = Loadable({
  loader: () => import('./containers/JobsContainer'),
  loading() {
    return <LoadingScreen showNav />;
  },
});
const AssessmentsContainer = Loadable({
  loader: () => import('./containers/AssessmentsContainer'),
  loading() {
    return <LoadingScreen showNav />;
  },
});
const CoursesContainer = Loadable({
  loader: () => import('./containers/CoursesContainer'),
  loading() {
    return <LoadingScreen showNav />;
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: Theme, user: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    cloudFunction(
      CLOUD_FUNCTIONS.LEARN_WORLD_SSO,
      {},
      o => {
        console.log(o);
      },
      o => {
        console.log(o);
      }
    );
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    // const isMobile = window.innerWidth < 700;
    const isMobile = window.innerWidth < 960;
    const isLessThan840 = window.innerWidth < 840;

    if (isMobile !== this.state.theme.responsive.isMobile) {
      this.setState({
        theme: Object.assign(Theme, {
          responsive: {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile,
            isLessThan840,
          },
        }),
      });
    }

    if (isLessThan840 !== this.state.theme.responsive.isLessThan840) {
      this.setState({
        theme: Object.assign(Theme, {
          responsive: {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile,
            isLessThan840,
          },
        }),
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <UserContext.Provider
          value={{
            user: this.state.user,
            setUser: user => this.setState({ user }),
          }}
        >
          <Router>
            <div className="app">
              <TagTracker />
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
                  path={ROUTES.UPLOAD_RESUME}
                  component={() => <SignupContainer />}
                />
                <Route
                  exact
                  path={ROUTES.SMART_LINK}
                  component={() => <SmartLinkContainer />}
                />

                <Route
                  exact
                  path={ROUTES.DASHBOARD}
                  component={() => <DashboardContainer />}
                />
                <Route
                  exact
                  path={ROUTES.PROFILE}
                  component={() => <ProfileContainer />}
                />
                <Route
                  exact
                  path={ROUTES.JOBS}
                  component={() => <JobsContainer />}
                />
                <Route
                  exact
                  path={ROUTES.ASSESSMENTS}
                  component={() => <AssessmentsContainer />}
                />
                <Route
                  exact
                  path={ROUTES.COURSES}
                  component={() => <CoursesContainer />}
                />

                <Route exact path="/linkedin" component={LinkedInPopUp} />
                <Route exact path={'/'} component={() => <Landing />} />
                <Route component={() => <div>404</div>} />
              </Switch>
            </div>
          </Router>
        </UserContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
