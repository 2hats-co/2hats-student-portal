import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//redux actions
import * as action from '../actions/AuthenticationContainerActions';
//material ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import StyledLink from '../components/StyledLink';


//Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withHandlers } from 'recompose'
import { withFirestore } from '../utilities/withFirestore';
import { auth } from '../firebase';
import { COLLECTIONS } from '../constants/firestore';
//routing
import * as routes from '../constants/routes'
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from '../constants/views';
//authentication

import Name from '../components/InputFields/Name'

import Disclaimer from '../components/Authentication/Disclaimer';

import EmailAuth from '../components/Authentication/EmailAuth'
import GoogleButton from '../components/Authentication/GoogleButton'
import LinkedinButton from '../components/Authentication/LinkedinButton'

import LogoInCard from '../components/LogoInCard'

const styles = theme => ({
  root: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 500
  },
  button: {
    marginTop: 17,
    marginBottom: 17,
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
  isMounted: true,
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
  emailReport:null
});

const googleButton = (<GoogleButton/>)
const linkedinButton = (<LinkedinButton/>)
const emailAuth = (<EmailAuth/>)
class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goToIntroduction = this.goToIntroduction.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.handleLoadingIndicator = this.handleLoadingIndicator.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSnackBar = this.handleSnackBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        console.log('user successfully created', authUser)
        authUser.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        })
      }).then((re) => {
          this.handleProgress(90),
          console.log('full name successfully created', re),
          this.setState({ isMounted: false }),
          setTimeout(() => {
            this.goToIntroduction()
          }, 1000)
      }
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
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { firstName, lastName, password, confirmPassword, email, error, view, isLoading, progress, showSnackBar, snackBarVariant, snackBarMessage } = this.state
    let linkButton = (label, link) => (<StyledLink key={`${label}${link}`} href={link}>
      {label}
    </StyledLink>)
   const nameFields = (<Name key="nameField" firstName={firstName} lastName={lastName} changeHandler={this.handleChange} />)
    const orLabel = (<Typography key="or" className={classes.or} variant="subheading" gutterBottom>
      OR
    </Typography>)
    
    const resetPasswordText = (<Grid key='resetPasswordText' container alignItems='left'>
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
      > Back
  </Button>
      <Button variant="flat" disabled={isDisable}
        className={classes.resetButton}
        onClick={() => { this.handleResetPassword(email) }}
      > reset
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
    
    const disclaimer = (<Disclaimer/>)
    
    const AuthView = [googleButton,linkedinButton,orLabel,emailAuth]
    const GoogleView = [GoogleButton]
    const LinkedinView = [LinkedinButton]

    let loadedView = AuthView
    let cardHeight = 450
    switch (view) {
      case AUTHENTICATION_CONTAINER.auth:
        loadedView = AuthView
        cardHeight = 450
        break;
      case AUTHENTICATION_CONTAINER.google:
     //   loadedView = 
        cardHeight = 450
        break; case AUTHENTICATION_CONTAINER.linkedin:
      //  loadedView = 
        cardHeight = 360
        break;
        case AUTHENTICATION_CONTAINER.magic:
       // loadedView = 
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
         {[loadedView]} 
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

function mapStateToProps(state) {
  return {
  };
}

function mapActionToProps(dispatch) {
  return bindActionCreators(action.actions, dispatch);
}

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
  //redux action connection
  connect(mapStateToProps, mapActionToProps)
)
export default enhance(
  withRouter(
    withStyles(styles)(AuthenticationContainer)
  )
)

