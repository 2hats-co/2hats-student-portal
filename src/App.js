import React, { Component } from "react";
// material UI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { Theme } from "./Theme";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
// containers
import withAuthentication from "./utilities/Session/withAuthentication";
//routing
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as routes from "./constants/routes";
import {
  AUTHENTICATION_CONTAINER,
  INTRODUCTION_CONTAINER
} from "./constants/views";
import Landing from "./components/Landing";
import TagTracker from "./components/TagTracker";

// loadable
import Loadable from "react-loadable";
const loadingCard = (
  <Grid
    container
    alignItems="center"
    justify="center"
    style={{ height: "100%", position: "absolute", top: 0, left: 0 }}
  >
    <CircularProgress color="primary" size={60} />
  </Grid>
);

const AuthenticationContainer = Loadable({
  loader: () => import("./containers/AuthenticationContainer"),
  loading() {
    return loadingCard;
  }
});
const SignupContainer = Loadable({
  loader: () => import("./containers/SignupContainer"),
  loading() {
    return loadingCard;
  }
});

const SpeedySignupContainer = Loadable({
  loader: () => import("./containers/SpeedySignupContainer"),
  loading() {
    return loadingCard;
  }
});
const IntroductionContainer = Loadable({
  loader: () => import("./containers/IntroductionContainer"),
  loading() {
    return loadingCard;
  }
});
const SmartLinkContainer = Loadable({
  loader: () => import("./containers/SmartLinkContainer"),
  loading() {
    return loadingCard;
  }
});
const ProfileContainer = Loadable({
  loader: () => import("./containers/ProfileContainer"),
  loading() {
    return loadingCard;
  }
});
const DashboardContainer = Loadable({
  loader: () => import("./containers/DashboardContainer"),
  loading() {
    return loadingCard;
  }
});
const JobBoardContainer = Loadable({
  loader: () => import("./containers/JobBoardContainer"),
  loading() {
    return loadingCard;
  }
});
const RemoteLoggerContainer = Loadable({
  loader: () => import("./containers/RemoteLoggerContainer"),
  loading() {
    return loadingCard;
  }
});
const SubmissionContainer = Loadable({
  loader: () => import("./containers/SubmissionContainer"),
  loading() {
    return loadingCard;
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: Theme };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    const isMobile = window.innerWidth < 700;
    const isLessThan840 = window.innerWidth < 840;

    if (isMobile !== this.state.theme.responsive.isMobile) {
      this.setState({
        theme: Object.assign(Theme, {
          responsive: {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile,
            isLessThan840
          }
        })
      });
    }

    if (isLessThan840 !== this.state.theme.responsive.isLessThan840) {
      this.setState({
        theme: Object.assign(Theme, {
          responsive: {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile,
            isLessThan840
          }
        })
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <Router>
          <div className="app">
            <TagTracker />
            <Route
              exact
              path={routes.SIGN_UP}
              component={() => <AuthenticationContainer isPublic />}
            />
            <Route
              exact
              path={routes.LOG_OUT}
              component={() => (
                <AuthenticationContainer
                  isPublic
                  view={AUTHENTICATION_CONTAINER.logout}
                />
              )}
            />
            <Route
              exact
              path={routes.SIGN_IN}
              component={() => <AuthenticationContainer isPublic />}
            />
            <Route
              exact
              path={routes.NO_PASSWORD}
              component={() => (
                <AuthenticationContainer
                  isPublic
                  view={AUTHENTICATION_CONTAINER.noPassword}
                />
              )}
            />
            <Route
              exact
              path={routes.CREATE_PASSWORD}
              component={() => (
                <AuthenticationContainer
                  isPublic
                  view={AUTHENTICATION_CONTAINER.createPassword}
                />
              )}
            />
            <Route
              exact
              path={routes.RESET_PASSWORD}
              component={() => (
                <AuthenticationContainer
                  isPublic
                  view={AUTHENTICATION_CONTAINER.resetPassword}
                />
              )}
            />
            <Route
              exact
              path={routes.VALIDATE_EMAIL}
              component={() => (
                <AuthenticationContainer
                  isPublic
                  view={AUTHENTICATION_CONTAINER.validateEmail}
                />
              )}
            />
            <Route
              exact
              path={routes.SPEEDY_SIGN_UP}
              component={() => <SpeedySignupContainer isPublic />}
            />
            <Route
              exact
              path={routes.DASHBOARD}
              component={() => <DashboardContainer />}
            />
            <Route
              exact
              path={routes.PROFILE}
              component={() => <ProfileContainer />}
            />
            <Route
              exact
              path={routes.JOB_BOARD}
              component={() => <JobBoardContainer />}
            />
            <Route
              exact
              path={routes.INTRODUCTION}
              component={() => (
                <IntroductionContainer view={INTRODUCTION_CONTAINER.process} />
              )}
            />
            <Route
              exact
              path={routes.SUBMISSION}
              component={() => (
                <IntroductionContainer
                  view={INTRODUCTION_CONTAINER.submission}
                />
              )}
            />
            <Route
              exact
              path={routes.BUILD_RESUME}
              component={() => <SignupContainer />}
            />
            <Route
              exact
              path={routes.UPLOAD_RESUME}
              component={() => <SignupContainer />}
            />
            <Route
              exact
              path={routes.PREVIOUS_SUBMISSION}
              component={() => <SubmissionContainer />}
            />
            <Route
              exact
              path={routes.SMART_LINK}
              component={() => <SmartLinkContainer />}
            />
            <Route exact path="/linkedin" component={LinkedInPopUp} />
            <Route
              exact
              path={"/remoteLogs"}
              component={() => <RemoteLoggerContainer />}
            />
            <Route exact path={"/"} component={() => <Landing />} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
