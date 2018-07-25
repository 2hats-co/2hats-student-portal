import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//material ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LogoInCard from '../components/LogoInCard';
import GoogleIcon from '../assets/images/social/google.svg'
import LinkedinIcon from '../assets/images/social/linkedin.svg'

import StyledLink from '../components/StyledLink';
import { validateEmail, validatePassword, validateName } from '../utilities/validators';
//loading indecators
import CircularStatic from '../components/circularProgressStatic.js';
import CustomizedSnackbars from '../components/snackBars.js';
//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { withFirestore } from '../utilities/withFirestore';
import { auth } from '../firebase';
import { COLLECTIONS } from '../constants/firestore';
//routing
import * as routes from '../constants/routes'
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from '../constants/views';

//authentication
import GoogleLogin from '../utilities/GoogleLogin.js';
//firebase remote functions
import { firebaseFunctions } from '../firebase';

import Name from '../components/InputFields/Name'
import Password from '../components/InputFields/Password'
import Email from '../components/InputFields/Email'
import ConfirmPassword from '../components/InputFields/ConfirmPassword'
const styles = theme => ({
  root: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 500
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
  isMounted:true,
  confirmPassword: '',
  email: '',
  error: null,
  view: 'signup',
  isLoading: false,
  progress: 10,
  showSnackBar: false,
  snackBarVariant: '',
  snackBarMessage: '',
  timeStamp: ''
};

const updateByPropertyName = (propertyName, value) => () => ({
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
    this.handleLoadingIndicator = this.handleLoadingIndicator.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSnackBar = this.handleSnackBar.bind(this);
    this.handleChange = this.handleChange.bind(this)
 
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
  handleGoogleAuthFail = (error) => {
    console.log('google auth fail', error)
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

  handleGoogleAuth = (response) => {
    this.handleLoadingIndicator(true);
    this.handleProgress(30);
    console.log('google response -->', response);
    let data = {
      googleId: response.googleId,
      googleEmail: response.profileObj.email,
      familyName: response.profileObj.familyName,
      givenName: response.profileObj.givenName,
      photo: response.profileObj.imageUrl,
    };
    firebaseFunctions.callRemoteMethodOnFirestore('googleAuth', data, async (response) => {
      console.log('resp coming->', response);
      this.handleProgress(60);
      if (response.code) {
        this.handleLoadingIndicator(false);
        console.log(response.code);
        this.handleSnackBar(true, 'warning', response.code);
      }
      if (response.crossAuth) {
        console.log(response.crossAuth);
        this.handleSnackBar(true, 'success', 'authenticating with Linkedin instead...');
      }
      if (response.customToken) {
        try {
          console.log('authenticating ...');
          const signInWithCustomToken = await auth.doSignInWithCustomToken(response.customToken);
          console.log('authWithGoogle successfully ...', signInWithCustomToken); // loading user data from firebase authentication system
          if (!response.crossAuth) {
            this.handleSnackBar(true, 'success', 'Google authenticating successfully !');
          }
          this.handleProgress(80);
          if (response.returnedUser === false) {
            // todo: means this is a brand new user, he/she should go through the initial registration steps before accessing the profile page
            this.handleProgress(90);
            setTimeout(() => {
              this.handleLoadingIndicator(false);
              this.goToIntroduction()
            }, 500)
           
          } else {
            // todo: means this is an existing user, go to profile page directly
            this.handleProgress(90);
            setTimeout(() => {
              this.handleLoadingIndicator(false);
              this.goToDashboard()
            }, 500)
         
          }

        } catch (error) {
          this.handleLoadingIndicator(false);
          console.log('Google auth error', error);
        }
      }

    })
  }

  handleLinkedInAuth = () => {
    //!important, please add an indicator to cover the screen, because the linkedin auth will take longer time than google does.
    this.handleLoadingIndicator(true);
    this.handleProgress(20);
    const fields = ":(id,email-address,headline,summary,first-name,last-name,num-connections,picture-urls::(original))";
    window.IN.API.Raw(`/people/~${fields}`).result(async r => {
      console.log('linked in response -->', r);
      this.handleProgress(40);
      firebaseFunctions.callRemoteMethodOnFirestore('linkedinAuth', r, async (response) => {
        console.log('resp coming->', response);
        this.handleProgress(60);
        if (response.code) {
          this.handleLoadingIndicator(false);
          console.log(response.code);
          this.handleSnackBar(true, 'warning', response.code);
        }
        if (response.crossAuth) {
          console.log(response.crossAuth);
          this.handleSnackBar(true, 'success', 'authenticating with Google instead...');
        }
        if (response.customToken) {
          try {
            console.log('authenticating ...');
            const signInWithCustomToken = await auth.doSignInWithCustomToken(response.customToken);
            console.log('authWithLinkedin successfully ...', signInWithCustomToken); // loading user data from firebase authentication system
            if (!response.crossAuth) {
              this.handleSnackBar(true, 'success', 'Linkedin authenticating successfully !');
            }
            this.handleProgress(80);
            if (response.returnedUser === false) {
              // todo: means this is a brand new user, he/she should go through the initial registration steps before accessing the profile page
              this.handleProgress(90);
              setTimeout(() => {
                this.handleLoadingIndicator(false);
                this.goToIntroduction()
              }, 500)

              // Note: for demo purpose, introduction page will be displayed
            } else {
              // todo: means this is an existing user, go to profile page directly
              this.handleProgress(90);
              setTimeout(() => {
                this.handleLoadingIndicator(false);
                this.goToDashboard()
              }, 500)
            }

          } catch (error) {
            this.handleLoadingIndicator(false);
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

  handleSnackBar = (showSnackBar, snackBarVariant, snackBarMessage) => {
    this.setState({
      showSnackBar,
      snackBarVariant,
      snackBarMessage,
    }, () => {
      if (snackBarVariant !== 'success') {
        setTimeout(() => {
          this.setState({
            showSnackBar: false
          }, () => {
            console.log('snackBar reset!')
          })
        }, 3000)
      }

    })
  }
  handleLoadingIndicator(isLoading) {
    this.setState({ isLoading: isLoading })
  }
  handleProgress(progress) {
    this.setState({ progress: progress })
  }
  handleSignin() {
    this.handleLoadingIndicator(true);
    this.handleProgress(30);
    const { email, password } = this.state;
    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.handleProgress(60);
        this.props.onSignIn(authUser.user.uid)
        this.setState(() => ({ ...INITIAL_STATE, isLoading: true }));
        this.handleProgress(90);
        this.handleSnackBar(true, 'success', 'Sign in successfully !');
        setTimeout(() => {
          this.goToDashboard()
        }, 500)
      })
      .catch(error => {
        console.log('error', error);
        this.handleSnackBar(true, 'error', error.message);
        this.handleLoadingIndicator(false);
        this.setState(updateByPropertyName('error', error));
      });
  }
  handleSignup() {
    this.handleLoadingIndicator(true);
    this.handleProgress(30);
    const { firstName, lastName, email, password } = this.state
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.handleProgress(60);
        authUser.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        })}).then(
          this.handleProgress(90),
          this.setState({isMounted:false}),
          setTimeout(() => {
            this.goToIntroduction()
          }, 1000)
        ).catch(error => {
          console.log('error', error);
          this.handleSnackBar(true, 'error', error.message);
          this.handleLoadingIndicator(false);
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
  }
  componentDidMount() {
    const LinkedinCID = '86gj7a83u3ne8b'; // CID should be hidden somewhere else, I put here only for development purpose
    this.initializeLinkedin(LinkedinCID);
  }
  render() {
    const { classes } = this.props;
    const GoogleCID = '983671595153-t8ebacvkq0vc3vjjk05r65lk2jv7oc5r.apps.googleusercontent.com';
    const { firstName, lastName, password, confirmPassword, email, error, view, isLoading, progress, showSnackBar, snackBarVariant, snackBarMessage } = this.state
    let socialButton = (provider, method) => (
      provider === 'google' ?
        <GoogleLogin
          key={`${provider}${method}`}
          clientId={GoogleCID}
          buttonText="Login"
          onSuccess={this.handleGoogleAuth}
          onFailure={this.handleGoogleAuthFail}
          render={renderProps => (
            <Button variant='flat'
              key={`${provider}${method}1`}
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
    const emailField = (<Email key="emailField" value={email} changeHandler={this.handleChange}/>)
    const passwordField = (<Password key="passwordField" value={password} changeHandler={this.handleChange}/>)
    const confirmPasswordField =(<ConfirmPassword key="confirmPasswordField" value={confirmPassword} changeHandler={this.handleChange}/>)
    const nameFields = (<Name key="nameField" firstName={firstName} lastName={lastName} changeHandler={this.handleChange}/>)
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
    const signUpButton = (<Button key='signupbutton' variant="flat" disabled={(!validateName(firstName) || !validateName(lastName) || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword)} onClick={this.handleSignup.bind(this)} className={classes.button}>
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
      <LogoInCard width={350} height={isLoading ? 300 : cardHeight}>
        <Grid
          container
          className={classes.root}
          alignItems='center'
          direction='column'
          justify='flex-start'
        >
          {
            isLoading ?
              <div><CircularStatic completed={progress} /><Typography>Loading, please wait</Typography></div> : loadedView.map(x => x)
          }
        </Grid>
        {
          showSnackBar &&
          <CustomizedSnackbars showSnackBar={showSnackBar} variant={snackBarVariant} message={snackBarMessage} />
        }

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
    onSignIn: props => (uid) =>
      props.firestore.update({ collection: COLLECTIONS.users, doc: uid }, {
        lastSignInAt: props.firestore.FieldValue.serverTimestamp()
      }
      ),
  }),

)
export default enhance(
  withRouter(
    withStyles(styles)(AuthenticationContainer)
  )
)

