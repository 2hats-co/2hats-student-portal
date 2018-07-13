import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//material ui
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LogoInCard from '../components/LogoInCard';
import GoogleIcon from '../assets/images/social/google.svg'
import LinkedinIcon from '../assets/images/social/linkedin.svg'

import StyledLink from '../components/StyledLink';
import { validateEmail, validatePassword, validateName } from '../utilities/validators'

//Redux
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withFirestore } from '../utilities/withFirestore';
import { auth } from '../firebase';
import { COLLECTIONS } from '../constants/firestore';

//routing
import * as routes from '../constants/routes'
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from '../constants/views';

//authentication
//import LinkedinSDK from 'react-linkedin-sdk';
import GoogleLogin from '../utilities/GoogleLogin.js';

//firebase remote functions
import { firebaseFunctions } from '../firebase';

const styles = theme => ({
  root: {
    //position: 'fixed',
    //width: 300,
    paddingLeft: 50,
    paddingRight: 50,
    height: 500
  },
  textField: {
    marginTop: 0,
    width: '100%',
    marginBottom: 5
  },
  nameTextField: {
    //marginTop:-12,
    width: '46%'
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
    width: 120
  },
  resetButton: {
    width: 100
  },
  socialButton: {
    margin: 5,
    width: 250,
    height: 40,
    color: '#fff',
  },

  socialIcon: {

    marginRight: 17
  },
  or: {
    marginTop: 15
  },
  footerLink: {
    display: 'inline',
    marginRight: 5
  }
});
const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: '',
  error: null,
  view: 'signup',
  isLoading: false
};

const updateByPropertyName = (propertyName, value) => () => ({
  /// used for error snacks
  [propertyName]: value,
});


class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.goToIntroduction = this.goToIntroduction.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.handleLinkedInAuth = this.handleLinkedInAuth.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
  }
  goToSignIn() {
    this.props.history.push(routes.SIGN_IN)
  }
  goToIntroduction() {
    this.props.history.push(routes.INTRODUCTION);
  }
  goToDashboard() {
    this.props.history.push(routes.DASHBOARD);
  }

  // ? begin of different ways of authentication, jack

  handleGoogleAuth = async () => {
    // try {
    //   let authWithGoogle = await auth.doAuthWithGoogle();
    //   console.log('authWithGoogle successfully ...', authWithGoogle);
    //   if (authWithGoogle.additionalUserInfo.isNewUser) {
    //     // todo: means this is a brand new user, he/she should go through the initial registration steps before accessing the profile page
    //     this.props.history.push(routes.INTRODUCTION); 
    //     //console.log('go new user page');
    //   } else {
    //     // todo: means this is an existing user, go to profile page directly
    //     this.props.history.push(routes.INTRODUCTION); 
    //     //console.log('go returned user page')
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  initializeLinkedin = clientId => {
    ; ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0]
      const ljs = element
      let js = element
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = `//platform.linkedin.com/in.js`
      js.text = `api_key: ${clientId}`
      ljs.parentNode.insertBefore(js, ljs)
    })(document, 'script', 'linkedin-jssdk')
  }

  // initializeGoogle = clientId => {
  //   ; ((d, s, id, cb) => {
  //     const element = d.getElementsByTagName(s)[0]
  //     const fjs = element
  //     let js = element
  //     js = d.createElement(s)
  //     js.id = id
  //     js.src = 'https://apis.google.com/js/client:platform.js'
  //     if (fjs && fjs.parentNode) {
  //       fjs.parentNode.insertBefore(js, fjs)
  //     } else {
  //       d.head.appendChild(js)
  //     }
  //     js.onload = cb
  //   })(document, 'script', 'google-login', () => {
  //     const params = {
  //       client_id: clientId,
  //       cookie_policy: 'single_host_origin',
  //       login_hint: loginHint,
  //       hosted_domain: hostedDomain,
  //       fetch_basic_profile: fetchBasicProfile,
  //       discoveryDocs,
  //       ux_mode: uxMode,
  //       redirect_uri: redirectUri,
  //       scope,
  //       access_type: accessType
  //     }

  //     if (responseType === 'code') {
  //       params.access_type = 'offline'
  //     }

  //     window.gapi.load('auth2', () => {
  //       //this.enableButton()
  //       if (!window.gapi.auth2.getAuthInstance()) {
  //         window.gapi.auth2.init(params).then(
  //           res => {
  //             if (isSignedIn && res.isSignedIn.get()) {
  //               this.handleSigninSuccess(res.currentUser.get())
  //             }
  //           },
  //           err => onFailure(err)
  //         )
  //       }
  //       if (autoLoad) {
  //         this.signIn()
  //       }
  //     })

  //   })
  // }

  handleGoogleAuth = (response) => {
    console.log('google response -->', response);
    //const { googleEmail, familyName, givenName, googleId, photo } = request;
    let data = {
      googleId: response.googleId,
      googleEmail: response.profileObj.email,
      familyName: response.profileObj.familyName,
      givenName: response.profileObj.givenName,
      photo: response.profileObj.imageUrl,
    };
    firebaseFunctions.callRemoteMethodOnFirestore('googleAuth', data, async (response) => {
      console.log('resp coming->', response);
      if (response.code) {
        console.log(response.code);
      }
      if (response.customToken) {
        try {
          console.log('authenticating ...');
          const signInWithCustomToken = await auth.doSignInWithCustomToken(response.customToken);
          console.log('authWithGoogle successfully ...', signInWithCustomToken); // loading user data from firebase authentication system
          if (response.returnedUser == false) {
            // todo: means this is a brand new user, he/she should go through the initial registration steps before accessing the profile page
            this.props.history.push(routes.INTRODUCTION); // Note: for demo purpose, introduction page will be displayed
          } else {
            // todo: means this is an existing user, go to profile page directly
            this.props.history.push(routes.INTRODUCTION); // Note: for demo purpose, introduction page will be displayed
          }

        } catch (error) {
          console.log('Google auth error', error);
        }
      }

    })
  }

  handleLinkedInAuth = () => {
    //!important, please add an indicator to cover the screen, because the linkedin auth will take longer time than google does.
    this.setState({ isLoading: true })
    const fields = ":(id,email-address,headline,summary,first-name,last-name,num-connections,picture-urls::(original))";
    window.IN.API.Raw(`/people/~${fields}`).result(async r => {
      this.setState({ isLoading: false })
      console.log('linked in response -->', r);
      firebaseFunctions.callRemoteMethodOnFirestore('linkedinAuth', r, async (response) => {
        console.log('resp coming->', response);
        if (response.code) {
          console.log(response.code);
        }
        if (response.customToken) {
          try {
            console.log('authenticating ...');
            const signInWithCustomToken = await auth.doSignInWithCustomToken(response.customToken);
            console.log('authWithLinkedin successfully ...', signInWithCustomToken); // loading user data from firebase authentication system
            if (response.returnedUser == false) {
              // todo: means this is a brand new user, he/she should go through the initial registration steps before accessing the profile page
              this.props.history.push(routes.INTRODUCTION); // Note: for demo purpose, introduction page will be displayed
            } else {
              // todo: means this is an existing user, go to profile page directly
              this.props.history.push(routes.INTRODUCTION); // Note: for demo purpose, introduction page will be displayed
            }

          } catch (error) {
            console.log('Linkdin auth error', error);
          }
        }

      })

    })
  }

  authorize = e => {
    window.IN.User.authorize(this.handleLinkedInAuth, '')
  }

  // ? end of different of authentication, jack


  handleLoadingIndicator(isLoading) {
    this.setState({ isLoading: isLoading })
  }
  handleSignin() {
    const { email, password } = this.state;
    // const {history} = this.props;
    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.onSignIn(authUser.user.uid)
        this.setState(() => ({ ...INITIAL_STATE }));
        this.goToIntroduction()
        //history.push(routes.dashboard);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
  }
  handleSignup() {
    const { firstName, lastName, email, password } = this.state
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {

        this.props.createUser(authUser.user.uid, { firstName, lastName, email })
        this.props.createProfile(authUser.user.uid)

        this.setState(() => ({ ...INITIAL_STATE }));
        this.goToIntroduction()
        //TODO: use redux-firestore for creating new user

        // Create a user in your own accessible Firebase Database too
        // firestore.doCreateUser(authUser.user.uid, firstName,lastName, email)
        //   .then(() => {
        //     this.setState(() => ({ ...INITIAL_STATE }));
        //    // history.push(routes.onboard);
        //   })
        //   .catch(error => {
        //     this.setState(updateByPropertyName('error', error));
        //   });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
  }
  handleResetPassword(email) {
    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
  }
  handleChange = name => event => {
    /// used to update state on textfield change
    this.setState({
      [name]: event.target.value,
    });
  };
  componentWillMount() {
    this.setState({ view: this.props.view })
    //TODO check url , set state.view
  }
  componentDidMount() {
    const LinkedinCID = '86gj7a83u3ne8b'; // CID should be hidden somewhere else, I put here only for development purpose
    const GoogleCID = '983671595153-t8ebacvkq0vc3vjjk05r65lk2jv7oc5r.apps.googleusercontent.com';
    this.initializeLinkedin(LinkedinCID);
    //this.initializeGoogle(GoogleCID);
  }
  render() {
    const { classes } = this.props;
    const { firstName, lastName, password, confirmPassword, email, error, view } = this.state
    // const responseGoogle = (response) => {
    //   console.log(response);
    // }
    let socialButton = (provider, method) => (
      provider === 'google' ?
        <GoogleLogin
          key={`${provider}${method}`}
          clientId="983671595153-t8ebacvkq0vc3vjjk05r65lk2jv7oc5r.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.handleGoogleAuth}
          onFailure={this.handleGoogleAuth}
          render={renderProps => (
            <Button variant='flat'
              style={{ backgroundColor: '#E05449' }}
              onClick={renderProps.onClick}
              className={classes.socialButton}>
              <div className={classes.socialIcon} >
                <img alt={provider} src={GoogleIcon} />
              </div> sign {method} with {provider}
            </Button>
          )}
        />

        :
        <Button key={`${provider}${method}`} variant='flat'
          style={provider === 'google' ? { backgroundColor: '#E05449' } : { backgroundColor: '#0077B5' }}
          onClick={provider === 'google' ? this.handleGoogleAuth : this.authorize}
          className={classes.socialButton}>
          <div className={classes.socialIcon} >
            <img alt={provider} src={provider === 'google' ? GoogleIcon : LinkedinIcon} />
          </div> sign {method} with {provider}
        </Button>

    )


    let linkButton = (label, link) => (<StyledLink key={`${label}${link}`} href={link}>
      {label}
    </StyledLink>)
    const emailField = (
      <TextField
        id="email"
        key="email"
        label="Email Address"
        onChange={this.handleChange('email')}
        value={email}
        className={classes.textField}
        margin="normal"
        color="primary"
      />)

    const passwordField = (
      <TextField
        id="password"
        key="password"
        label="Password"
        value={password}
        onChange={this.handleChange('password')}
        //   placeholder="Password"
        className={classes.textField}
        margin="normal"
        type='password'
      />)
    const confirmPasswordField = (
      <TextField
        id="confirmPassword"
        key="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={this.handleChange('confirmPassword')}

        //  placeholder="Confirm Password"
        className={classes.textField}
        margin="normal"
        type='password'
      />)
    const nameFields = (<Grid
      key="nameFields"
      container
      justify='space-between'
      direction='row'
      style={{ width: "100%", marginTop: -20 }}
    >
      <TextField
        id="firstName"
        label="First Name"
        value={firstName}
        onChange={this.handleChange('firstName')}

        //   placeholder="First Name"
        className={classes.nameTextField}
        margin="normal"
        color="primary"
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={lastName}
        onChange={this.handleChange('lastName')}
        // placeholder="Last Name"
        className={classes.nameTextField}
        margin="normal"
        color="primary"
      />
    </Grid>)
    const orLabel = (<Typography key="or" className={classes.or} variant="subheading" gutterBottom>
      OR
    </Typography>)
    const signInRow = (
      <Grid container
        key='signInRow'
        alignItems='center'
        justify='space-between'
        direction='row'
      >
        {linkButton('Forgot Password?', routes.PASSWORD_FORGET)}
        <Button variant='flat' onClick={this.handleSignin.bind(this)} className={classes.button}>
          Sign In
    </Button>
      </Grid>
    )
    const signUpButton = (<Button key='signupbutton' variant="flat" disabled={(!validateName(firstName) || !validateName(lastName) || !validateEmail(email) || !validatePassword(password) || password != confirmPassword)} onClick={this.handleSignup.bind(this)} className={classes.button}>
      Sign Up
</Button>)
    const resetPasswordText = (<Grid
      key='resetPasswordText'
      container
      alignItems='left'
    >
      <Typography variant="subheading" color="primary">
        Reset Password
</Typography>
      <Typography variant="body">
        Please enter your email address to receive the instruction for resetting password.
</Typography>
    </Grid>)
    let resetPasswordButton = (isDisable) => (<Grid container direction='row' justify='space-between' style={{ width: 230 }}>
      <Button variant="outlined"
        onClick={this.goToSignIn}
        className={classes.resetButton}
      >
        Back
  </Button>
      <Button
        variant="flat"
        disabled={isDisable}
        className={classes.resetButton}
        onClick={() => { this.handleResetPassword(email) }}
      >
        reset
  </Button>
    </Grid>)
    let footerLink = (label, link, linkLabel) => (
      <div key={`${label + link}`} >
        <Typography className={classes.footerLink} variant="body1">
          {label}
        </Typography>

        {linkButton(linkLabel, link)}
      </div>
    )



    const signInView = [socialButton('google', 'in'), socialButton('linkedin', 'in'), orLabel, emailField, passwordField, signInRow, footerLink('Don’t have an account?', routes.SIGN_UP, 'Sign Up')]
    const signUpView = [socialButton('google', 'up'), socialButton('linkedin', 'up'), orLabel, nameFields, emailField, passwordField, confirmPasswordField, signUpButton, footerLink('Already have an account?', routes.SIGN_IN, 'Sign In')]
    const resetView = [resetPasswordText, emailField, resetPasswordButton(!validateEmail(email))]
    let loadedView = signUpView
    let cardHeight = 610

    switch (view) {
      case AUTHENTICATION_CONTAINER.signUp:
        loadedView = signUpView
        cardHeight = 610
        break;
      case AUTHENTICATION_CONTAINER.signIn:
        loadedView = signInView
        cardHeight = 510
        break; case AUTHENTICATION_CONTAINER.resetPassword:
        loadedView = resetView
        cardHeight = 360
        break;
      default:
        break;
    }


    return (

      <LogoInCard width={350} height={cardHeight}>
        <Grid
          container
          className={classes.root}
          alignItems='center'
          direction='column'
          justify='flex-start'
        >
          {loadedView.map(x => x)}
          {/* <GoogleLogin
            clientId="983671595153-t8ebacvkq0vc3vjjk05r65lk2jv7oc5r.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            render={renderProps => (
              <Button key='googleup' variant='flat'
                style={{ backgroundColor: '#E05449' }}
                onClick={renderProps.onClick}
                className={classes.socialButton}>
                <div className={classes.socialIcon} >
                  <img alt='google' src={GoogleIcon} />
                </div> sign up with google
              </Button>
            )}
          /> */}
        </Grid>
      </LogoInCard>

    );
  }
}

AuthenticationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({
    firestore: PropTypes.object
  })
};

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({

    createUser: props => (uid, user) =>

      props.firestore.set({ collection: COLLECTIONS.users, doc: uid }, {
        ...user,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }

      ),
    createProfile: props => (uid) =>

      props.firestore.set({ collection: COLLECTIONS.profiles, doc: uid }, {
        hasSubmit: false,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }

      ),
    onSignIn: props => (uid) =>

      props.firestore.update({ collection: COLLECTIONS.users, doc: uid }, {
        lastSignInAt: props.firestore.FieldValue.serverTimestamp()
      }
      ),

    // console.log(props)
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts

  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({ // state.firestore
    //  profiles: firestore.ordered.profiles, // document data in array
    // profiles: firestore.data.profiles, // document data by id
  }))
)
export default enhance(
  withRouter(
    withStyles(styles)(AuthenticationContainer)
  )
)

