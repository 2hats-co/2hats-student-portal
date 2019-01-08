import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//routing
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import { AUTHENTICATION_CONTAINER } from '../constants/views';

import { warmUp } from '../utilities/Authentication/warmUp';
import LogoInCard from '../components/LogoInCard';
import SignUpIntro from '../components/Authentication/SignUpIntro';
// Views
import AuthView from '../components/Authentication/AuthView';
import NoPasswordView from '../components/Authentication/NoPasswordView';
import SocialView from '../components/Authentication/SocialView';
import SignUpView from '../components/Authentication/SignUpView';
import PasswordView from '../components/Authentication/PasswordView';
import ResetPasswordView from '../components/Authentication/ResetPasswordView';
import CreatePasswordView from '../components/Authentication/CreatePasswordView';
import MessageView from '../components/Authentication/MessageView';

//utilities
import {
  createUserWithPassword,
  signInWithPassword,
  updateUserPassword,
} from '../utilities/Authentication/authWithPassword';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import { auth } from '../firebase';
import { connect } from 'react-redux';
import { actionTypes } from 'redux-firestore';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  logoInCardGrid: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 40,
  },
});
const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  password: '',
  isMounted: true,
  confirmPassword: '',
  email: '',
  error: null,
  view: AUTHENTICATION_CONTAINER.auth,
  isLoading: false,
  progress: 10,
  snackBar: null,
  timeStamp: '',
};

class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goTo = this.goTo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.handleGTevent = this.handleGTevent.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }
  async componentWillMount() {
    warmUp(CLOUD_FUNCTIONS.CHECK_EMAIL);
    warmUp(CLOUD_FUNCTIONS.AUTHENTICATE_3RD_PARTY);
    const linkParams = ['firstName', 'smartKey'];
    linkParams.forEach(x => {
      if (this.props.history.location.search.includes(x)) {
        this.setState({
          [x]: this.props.history.location.search
            .split(`${x}=`)[1]
            .split('?')[0],
        });
      }
    });

    if (this.props.view) {
      this.setState({ view: this.props.view });
    }
    if (this.props.view === AUTHENTICATION_CONTAINER.logout) {
      await auth.doSignOut();
      this.setState({ view: AUTHENTICATION_CONTAINER.logout });
      this.goTo(routes.LOG_OUT);
    }
    window.Intercom('update', {
      hide_default_launcher: true,
    });
    window.Intercom('hide');
  }
  handleGTevent(name) {
    window.dataLayer.push({
      event: 'VirtualPageview',
      virtualPageURL: `/virtual/${name}-Success/`,
      virtualPageTitle: `${name}-Success`,
    });
  }
  goTo(route) {
    this.props.history.push(route);
  }
  handleSignin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = { email, password };
    signInWithPassword(
      user,
      route => {
        this.goTo(route), this.handleGTevent('Signin');
      },
      this.handleError
    );
  }
  handleError = o => {
    this.setState({
      snackBar: { message: o.message, variant: 'error' },
      isLoading: false,
    });
  };
  handleSignup() {
    if (!this.state.isLoading) {
      const { firstName, lastName, email, password } = this.state;
      if (firstName !== '' || lastName !== '') {
        const user = { firstName, lastName, email, password };
        this.setState({ isLoading: true });
        createUserWithPassword(
          user,
          route => {
            console.log('going to ' + route);
            this.goTo(route);
            this.handleGTevent('Signup');
          },
          this.handleError
        );
      } else {
        this.setState({
          snackBar: {
            message: 'Please enter you first and last name',
            variant: 'error',
          },
          isLoading: false,
        });
      }
    }
  }

  handleUpdatePassword(route) {
    const { password, smartKey } = this.state;
    updateUserPassword(
      password,
      () => {
        this.goTo(route),
          cloudFunction(CLOUD_FUNCTIONS.DISABLE_SMART_LINK, {
            slKey: smartKey,
            reason: 'This link has already been used',
          });
      },
      this.handleError
    );
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleBack() {
    this.setState({ view: AUTHENTICATION_CONTAINER.auth });
  }

  handleForgotPassword = () => {
    const { isLoading, email } = this.state;
    if (!isLoading) {
      const request = { email: email.toLowerCase() };
      this.setState({ isLoading: true });
      cloudFunction(
        CLOUD_FUNCTIONS.RESET_PASSWORD,
        request,
        result => {
          this.setState({
            snackBar: {
              message: 'We set you an email to reset your password.',
              variant: 'success',
            },
            isLoading: false,
          });
        },
        error => {
          this.setState({
            snackBar: {
              message: error.message,
              variant: 'error',
            },
            isLoading: false,
          });
        }
      );
    }
  };

  render() {
    const { classes, theme } = this.props;
    const {
      firstName,
      lastName,
      password,
      isLoading,
      snackBar,
      email,
      view,
    } = this.state;
    console.log(theme);
    const onSignupRoute =
      this.props.history.location.pathname === routes.SIGN_UP;

    let loadedView;

    switch (view) {
      case AUTHENTICATION_CONTAINER.google:
        loadedView = (
          <SocialView
            type="Google"
            isLoading={isLoading}
            email={email}
            backHandler={this.handleBack}
            firstName={firstName}
            GTeventHandler={this.handleGTevent}
            onSignupRoute={onSignupRoute}
            changeHandler={this.handleChange}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.linkedin:
        loadedView = (
          <SocialView
            type="LinkedIn"
            isLoading={isLoading}
            email={email}
            backHandler={this.handleBack}
            firstName={firstName}
            onSignupRoute={onSignupRoute}
            changeHandler={this.handleChange}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.signup:
        loadedView = (
          <SignUpView
            isLoading={isLoading}
            email={email}
            backHandler={this.handleBack}
            onSignupRoute={onSignupRoute}
            changeHandler={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            password={password}
            passwordAction={this.handleSignup}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.password:
        loadedView = (
          <PasswordView
            isLoading={isLoading}
            email={email}
            backHandler={this.handleBack}
            changeHandler={this.handleChange}
            firstName={firstName}
            password={password}
            passwordAction={this.handleSignin}
            forgotPasswordHandler={this.handleForgotPassword}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.resetPassword:
        loadedView = (
          <ResetPasswordView
            firstName={firstName}
            changeHandler={this.handleChange}
            password={password}
            passwordAction={this.handleUpdatePassword}
            isLoading={isLoading}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.createPassword:
        loadedView = (
          <CreatePasswordView
            onSignupRoute={onSignupRoute}
            isLoading={isLoading}
            firstName={firstName}
            handleGTevent={this.handleGTevent}
            changeHandler={this.handleChange}
            password={password}
            passwordAction={this.handleUpdatePassword}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.logout:
        loadedView = (
          <MessageView
            message="You have successfully logged out"
            destination={routes.SIGN_IN}
            destinationName="sign in"
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.noPassword:
        loadedView = (
          <NoPasswordView
            changeHandler={this.handleChange}
            isLoading={isLoading}
            email={email}
            backHandler={this.handleBack}
            firstName={firstName}
          />
        );
        break;

      case AUTHENTICATION_CONTAINER.validateEmail:
        loadedView = (
          <MessageView
            message="Thank you, we have validated your email"
            destination={routes.DASHBOARD}
            destinationName="dashboard"
          />
        );
        break;

      default:
        loadedView = (
          <AuthView
            isLessThan840={theme.responsive.isLessThan840}
            onSignupRoute={onSignupRoute}
            isLoading={isLoading}
            handleGTevent={this.handleGTevent}
            changeHandler={this.handleChange}
            urlParams={this.props.location.search}
          />
        );
        break;
    }

    return (
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        {theme.responsive.isLessThan840 ? null : view !==
          AUTHENTICATION_CONTAINER.auth ? null : (
          <SignUpIntro />
        )}
        <Grid item>
          <LogoInCard
            width={350}
            height="auto"
            isLoading={isLoading}
            snackBar={snackBar}
          >
            <Grid
              container
              className={classes.logoInCardGrid}
              alignItems="center"
              direction="column"
              justify="space-between"
            >
              {[loadedView]}
            </Grid>
          </LogoInCard>
        </Grid>
      </Grid>
    );
  }
}

AuthenticationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    clearData: () => {
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: { data: false, ordered: false },
      });
    },
  };
}
export default withRouter(
  withStyles(styles, { withTheme: true })(
    connect(mapDispatchToProps)(AuthenticationContainer)
  )
);
