import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//material ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyledLink from '../components/StyledLink';

//routing
import * as routes from '../constants/routes'
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from '../constants/views';

//authentication components
import Name from '../components/InputFields/Name'
import Password from '../components/InputFields/Password'
import Disclaimer from '../components/Authentication/Disclaimer';
import EmailAuth from '../components/Authentication/EmailAuth'
import GoogleButton from '../components/Authentication/GoogleButton'
import LinkedinButton from '../components/Authentication/LinkedinButton'
import LogoInCard from '../components/LogoInCard'

//utilities
import {resetPasswordEmail} from '../utilities/Authentication/resetPassword'

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
  view: AUTHENTICATION_CONTAINER.auth,
  isLoading: false,
  progress: 10,
  showSnackBar: false,
  snackBarVariant: '',
  snackBarMessage: '',
  timeStamp: ''
};


const googleButton = (<GoogleButton/>)
const linkedinButton = (<LinkedinButton/>)

class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goTo = this.goTo.bind(this);
    this.handleLoadingIndicator = this.handleLoadingIndicator.bind(this);
    this.handleSnackBar = this.handleSnackBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }
  goTo(route){
    this.props.history.push(route)
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

  handleSignin() {
    this.handleLoadingIndicator(true);
    const { email, password } = this.state;
   const user = {email,password}
  }
  handleSignup() {
   
   
  }
  handleResetPasswordEmail(email) {
    //TODO: create restAPI
    resetPasswordEmail(email)
  }
  handleViewChange = (view) =>{
    this.setState({view:view})
  }
  handleChange =(name,value) => {
    this.setState({[name]:value});
  };
  render() {
    const { classes } = this.props;
    const { firstName, lastName, password, view,isLoading} = this.state

    const emailAuth = (<EmailAuth setView={this.handleViewChange}/>)
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

    let footerLink = (label, link, linkLabel) => (
      <div key={`${label + link}`} >
        <Typography className={classes.footerLink} variant="body1">
          {label}
        </Typography>
        {linkButton(linkLabel, link)}
      </div>
    )
    const disclaimer = (<Disclaimer/>)
    const passwordField = (<Password changeHandler={this.handleChange}/>)
    const signUpButton =(
      <Button className={classes.button} onClick={this.handleSignup}>
        Sign Up
      </Button>
      )
    const signInButton =(
        <Button className={classes.button} onClick={this.handleSignin}>
          Sign In
        </Button>
        )
       
    const AuthView = [googleButton,linkedinButton,orLabel,emailAuth]
    const GoogleView = [googleButton]
    const LinkedinView = [linkedinButton]
    const signupView = [nameFields,passwordField,signUpButton]
    const passwordView = [passwordField,footerLink('forgot password?','send reset email','dsfsd'),signUpButton]
    let loadedView = signupView
    let cardHeight = 450
    switch (view) {
      case AUTHENTICATION_CONTAINER.auth:
        loadedView = AuthView
        cardHeight = 450
        break;
      case AUTHENTICATION_CONTAINER.google:
      loadedView = GoogleView
        cardHeight = 450
        break; case AUTHENTICATION_CONTAINER.linkedin:
      loadedView = LinkedinView
        cardHeight = 450
        break;
        case AUTHENTICATION_CONTAINER.signup:
       loadedView = signupView
        cardHeight = 450
        break;
        case AUTHENTICATION_CONTAINER.signin:
       loadedView = passwordView
        cardHeight = 450
        break;
      default:
        break;
    }
    return (
      <LogoInCard width={350} height={cardHeight} isLoading={isLoading}>
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
};
export default withRouter(withStyles(styles)(AuthenticationContainer))


