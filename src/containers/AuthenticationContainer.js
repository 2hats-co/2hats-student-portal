import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

//routing
import * as ROUTES from '../constants/routes';
import { AUTHENTICATION_CONTAINER } from '../constants/views';

// import { warmUp } from '../utilities/Authentication/warmUp';
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
  isLessThan840: false,
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
    // warmUp(CLOUD_FUNCTIONS.CHECK_EMAIL);
    const parsedQuery = queryString.parse(this.props.history.location.search);
    // console.log(parsedQuery);
    const linkParams = ['firstName', 'smartKey', 'route', 'email'];
    linkParams.forEach(x => {
      if (parsedQuery[x]) {
        this.setState({
          [x]: parsedQuery[x],
        });
      }
    });
    this.setState({ urlParams: parsedQuery });

    if (this.props.view) {
      this.setState({ view: this.props.view });
    }
    if (this.props.view === AUTHENTICATION_CONTAINER.logout) {
      await auth.signOut();
      this.setState({ view: AUTHENTICATION_CONTAINER.logout });
      this.goTo(ROUTES.LOG_OUT);
    }
  }

  updateWindowDimensions = () => {
    this.setState({ isLessThan840: window.innerWidth < 840 });
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleGTevent(name) {
    window.dataLayer.push({
      event: 'VirtualPageview',
      virtualPageURL: `/virtual/${name}-Success/`,
      virtualPageTitle: `${name}-Success`,
    });
  }
  goTo(route) {
    if (route) this.props.history.push(route);
    // else if (this.state.route)
    // this.props.history.push(decodeURIComponent(this.state.route));
  }

  getHomeReferrerId() {
    const parsedQuery = queryString.parse(this.props.location.search);
    if (parsedQuery.referrer) return parsedQuery.referrer;

    if (parsedQuery.route) {
      const parsedRedirectQuery = queryString.parse(
        parsedQuery.route.split('?')[1]
      );
      if (parsedRedirectQuery.referrer) return parsedRedirectQuery.referrer;
    }

    return '';
  }

  handleSignin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = { email, password, homeReferrerId: this.getHomeReferrerId() };

    signInWithPassword(
      user,
      () => {
        this.goTo(
          `${ROUTES.LANDING}${
            this.state.route
              ? `?route=${encodeURIComponent(this.state.route)}`
              : ''
          }`
        );
        this.handleGTevent('Signin');
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
        const user = {
          firstName,
          lastName,
          email,
          password,
          homeReferrerId: this.getHomeReferrerId(),
        };
        this.setState({ isLoading: true });
        createUserWithPassword(
          user,
          route => {
            console.log('Signed up. Going to ' + ROUTES.LANDING);
            this.goTo(
              `${ROUTES.LANDING}?completedRegistration=true${
                this.state.route ? `&route=${this.state.route}` : ''
              }`
            );
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
        this.goTo(route);
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
              message:
                'We sent you an email to reset your password. Don’t forget to check your spam folder!',
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
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      password,
      isLoading,
      snackBar,
      email,
      view,
      isLessThan840,
    } = this.state;

    const onSignupRoute =
      this.props.history.location.pathname === ROUTES.SIGN_UP;

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
            goTo={this.goTo}
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
            goTo={this.goTo}
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
            destination={ROUTES.SIGN_IN}
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
            destination={ROUTES.LANDING}
            destinationName="dashboard"
          />
        );
        break;

      default:
        loadedView = (
          <AuthView
            isLessThan840={isLessThan840}
            onSignupRoute={onSignupRoute}
            isLoading={isLoading}
            handleGTevent={this.handleGTevent}
            changeHandler={this.handleChange}
            urlParams={this.state.urlParams}
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
        {isLessThan840 ? null : view !==
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
              {loadedView}
            </Grid>
          </LogoInCard>
        </Grid>
      </Grid>
    );
  }
}

AuthenticationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthenticationContainer);
