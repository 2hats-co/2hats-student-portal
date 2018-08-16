import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//material ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
import ChangeAdpter from '../components/InputFields/ChangeAdapter'

//utilities
import {resetPasswordEmail} from '../utilities/Authentication/resetPassword'
import {createUserWithPassword,signInWithPassword,updateUserPassword} from '../utilities/Authentication/authWithPassword'

import BackIcon from '@material-ui/icons/KeyboardBackspace'
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
  },iconButton:{
    fontColor:'#000'
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
  view: AUTHENTICATION_CONTAINER.createPassword,
  isLoading: false,
  progress: 10,
  showSnackBar: false,
  snackBarVariant: '',
  snackBarMessage: '',
  timeStamp: ''
};



class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goTo = this.goTo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this)
    this.handleSignin = this.handleSignin.bind(this)
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this)
  }
  goTo(route){
    this.props.history.push(route)
  }
  handleSignin() {
    this.setState({isLoading:true})
    const { email, password } = this.state;
   const user = {email,password}
   signInWithPassword(user,(route)=>this.goTo(route),(o)=>(console.log(o)))
  }
  handleSignup() {
   const {firstName,lastName,email,password} = this.state
   const user= {firstName,lastName,email,password}
   createUserWithPassword(user,(route)=>this.goTo(route),(o)=>(console.log(o)))
  }
  handleUpdatePassword() {
    const {password} = this.state
    updateUserPassword(password,(route)=>this.goTo(route),(o)=>(console.log(o)))
   }
  handleResetPasswordEmail(email) {
    //TODO: create restAPI
    resetPasswordEmail(email)
  }
 
  handleChange =(name,value) => {
    this.setState({[name]:value});
  };
  render() {
    const { classes } = this.props;
    const { firstName, lastName, password, view,isLoading,email} = this.state
    const backBar = ( <Grid style={{width:'100%',marginLeft:-30}} 
                        container direction='row' alignItems='center'
                        justify='flex-start'> 
                        <IconButton aria-label="back" 
                        id="back-to-email" onClick={()=>{this.setState({view:AUTHENTICATION_CONTAINER.auth})}}>
    <BackIcon className={classes.iconButton} />
  </IconButton> <Typography variant={(email.length<25)?'subheading':'body1'}>{email}</Typography></Grid>)
    const googleButton = (<GoogleButton key='google-button'  id='google-button' changeHandler={this.handleChange}/>)
    const linkedinButton = (<LinkedinButton key='linkedin-button'  id='google-button'  changeHandler={this.handleChange}/>)
    const emailAuth = (<EmailAuth changeHandler={this.handleChange}/>)
    let linkButton = (label, link) => (<StyledLink key={`${label}${link}`} href={link}>
      {label}
    </StyledLink>)
   const nameFields = (  <ChangeAdpter changeHandler={this.handleChange}>
    <Name key='namefield' firstName={firstName} lastName={lastName}/>
</ChangeAdpter>)
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
    const welcomeGreeting = (<Typography variant='title' color='primary' style={{width:'100%'}}>Welcome back {firstName},</Typography>)
    const hiGreeting = (<Typography variant='title' color='primary' style={{width:'100%'}}>Hi {firstName},</Typography>)
    const resetPasswordMessage = (<Typography variant='subheading'>Please enter in a new password to reset.</Typography>)
    const googleMessage = (<Typography variant='subheading'>It looks like your account is created with Google.</Typography>)
    const linkedinMessage = (<Typography variant='subheading'>It looks like your account is created with Linkedin.</Typography>)
    const newAccountMessage = (<Typography variant='subheading'>It look likes we don’t have an account with this email address.</Typography>)
     
    const passwordField = (<ChangeAdpter changeHandler={this.handleChange}><Password password={password}/></ChangeAdpter>)
    const signUpButton =(
      <Button className={classes.button} onClick={this.handleSignup}>
        Sign Up
      </Button>
      )
      const updatePasswordButton = (
        <Button className={classes.button} onClick={this.handleUpdatePassword}>
         Update
        </Button>
        )
    const signInButton = (
        <Button className={classes.button} onClick={this.handleSignin}>
          Sign In
        </Button>
        )
       
    const AuthView = [googleButton,linkedinButton,orLabel,emailAuth]
    const GoogleView = [backBar,welcomeGreeting,googleMessage,googleButton]
    const LinkedinView = [backBar,welcomeGreeting,linkedinMessage,linkedinButton]
    const signupView = [backBar,newAccountMessage,nameFields,passwordField,disclaimer,signUpButton]
    const passwordView = [backBar,welcomeGreeting,passwordField,signInButton]
    const updatePassword =[backBar,hiGreeting,resetPasswordMessage,passwordField,updatePasswordButton]
    let loadedView = signupView
    let gridHeight = 200
    let cardHeight = 450
    switch (view) {
      case AUTHENTICATION_CONTAINER.auth:
        loadedView = AuthView
        cardHeight = 450
    gridHeight = 300

        break;
      case AUTHENTICATION_CONTAINER.google:
      loadedView = GoogleView
      cardHeight = 350
      gridHeight =200
        break; case AUTHENTICATION_CONTAINER.linkedin:
      loadedView = LinkedinView
        cardHeight = 350
        gridHeight =200
        break;
        case AUTHENTICATION_CONTAINER.signup:
       loadedView = signupView
        cardHeight = 480
        gridHeight= 350
        break;
        case AUTHENTICATION_CONTAINER.password:
       loadedView = passwordView
        cardHeight = 450
        gridHeight= 300
        break;
        case AUTHENTICATION_CONTAINER.reset:
       loadedView = updatePassword
        cardHeight = 450
        gridHeight= 300
        break;

        case AUTHENTICATION_CONTAINER.createPassword:
        loadedView = updatePassword
         cardHeight = 450
         gridHeight= 300
         break;
      default:
        break;
    }
    return (
      <LogoInCard width={350} height={cardHeight} isLoading={isLoading}>
        <Grid
          container
          className={classes.root}
          style={{height:gridHeight}}
          alignItems='center'
          direction='column'
          justify='space-between'
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


