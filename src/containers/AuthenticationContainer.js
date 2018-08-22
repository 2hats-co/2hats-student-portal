import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import StyledLink from "../components/StyledLink";

import DoneIcon from '@material-ui/icons/DoneAll'
//routing
import * as routes from "../constants/routes";
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from "../constants/views";

//authentication components
import Name from "../components/InputFields/Name";
import Password from "../components/InputFields/Password";
import Disclaimer from "../components/Authentication/Disclaimer";
import EmailAuth from "../components/Authentication/EmailAuth";
import GoogleButton from "../components/Authentication/GoogleButton";
import LinkedinButton from "../components/Authentication/LinkedinButton";
import LogoInCard from "../components/LogoInCard";
import ChangeAdpter from "../components/InputFields/ChangeAdapter";

//utilities
import {
  createUserWithPassword,
  signInWithPassword,
  updateUserPassword
} from "../utilities/Authentication/authWithPassword";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';

import BackIcon from "@material-ui/icons/KeyboardBackspace";
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
  createButton: {
    marginTop: 17,
    marginBottom: 17,
    width: 180
  },
  resetButton: {
    width: 100
  },
  socialButton: {
    margin: 5,
    width: 250,
    height: 40,
    color: "#fff"
  },
  socialIcon: {
    marginRight: 17
  },
  or: {
    marginTop: 15
  },
  footerLink: {
    display: "inline",
    marginRight: 5
  },
  iconButton: {
    fontColor: "#000"
  }
});
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  password: "",
  isMounted: true,
  confirmPassword: "",
  email: "",
  error: null,
  view: AUTHENTICATION_CONTAINER.auth,
  isLoading: false,
  progress: 10,
  snackBar: null,
  timeStamp: ""
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
  }
  componentWillMount() {
    if (this.props.history.location.search.includes("firstName")) {
      this.setState({
        firstName: this.props.history.location.search.split("firstName=")[1]
      });
    }
    if (this.props.view) {
      this.setState({ view: this.props.view });
    }

    window.Intercom("update", {
      hide_default_launcher: true
    });
    window.Intercom("hide");
  }
  goTo(route) {
    this.props.history.push(route);
  }
  handleSignin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = { email, password };
    signInWithPassword(user, route => this.goTo(route),this.handleError);
  }
  handleError=(o)=>{ 
    this.setState({snackBar:{message:o.message,variant:'error'},isLoading:false})
  }
  handleSignup() {
    if(!this.state.isLoading){
      const { firstName, lastName, email, password } = this.state;
      if(firstName!==''||lastName!==''){
        const user = { firstName, lastName, email, password };
        this.setState({isLoading:true})
      createUserWithPassword(
        user,
        route => this.goTo(route),
        this.handleError
      );
      }else{
        this.setState({snackBar:{message:'Please enter you first and last name',variant:'error'},isLoading:false})
      }
    }
   
    
  }
  handleUpdatePassword(route) {
    return () => {
      const { password } = this.state;
      updateUserPassword(
        password,
        () => this.goTo(route),
       this.handleError
      );
    };
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value });
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
      view
    } = this.state;
    const onSignupRoute = this.props.history.location.pathname=== routes.SIGN_UP
    const backBar = (
      <Grid key="back-bar"
        style={{ width: "100%", marginLeft: -30 }}
        container
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <IconButton
          aria-label="back"
          id="back-to-email"
          onClick={() => {
            this.setState({ view: AUTHENTICATION_CONTAINER.auth });
          }}
        >
          <BackIcon className={classes.iconButton} />
        </IconButton>{" "}
        <Typography variant={email.length < 25 ? "subheading" : "body1"}>
          {email}
        </Typography>
      </Grid>
    );
    const googleButton = (
      <GoogleButton
        key="google-button"
        id="google-button"
        action={onSignupRoute?'Sign up': 'Sign in'}
        changeHandler={this.handleChange}
      />
    );
    const linkedinButton = (
      <LinkedinButton
        key="linkedin-button"
        id="linkedin-button"
        action={onSignupRoute?'Sign up': 'Sign in'}
        changeHandler={this.handleChange}
      />
    );
    const emailAuth = <EmailAuth key='EmailAuth' changeHandler={this.handleChange} />;
    let linkButton = (label, link) => (
      <StyledLink key={`${label}${link}`} href={link}>
        {label}
      </StyledLink>
    );
    const nameFields = (
      <ChangeAdpter  key="namefield" changeHandler={this.handleChange}>
        <Name firstName={firstName} lastName={lastName} />
      </ChangeAdpter>
    );
    const orLabel = (
      <Typography
        key="or"
        className={classes.or}
        variant="subheading"
        gutterBottom
      >
        OR
      </Typography>
    );
    let footerLink = (label, link, linkLabel) => (
      <div key={`${label + link}`}>
        <Typography className={classes.footerLink} variant="body1">
          {label}
        </Typography>
        {linkButton(linkLabel, link)}
      </div>
    );

    const forgetPasswordLink = () => {
      const callback = () => {
        if(!isLoading){
          const request = {
            email: email
          };

          this.setState({isLoading:true});
          cloudFunction(CLOUD_FUNCTIONS.RESET_PASSWORD, request,
            (result) => {
              this.setState({
                snackBar: { 
                  message: "An email for resetting password is sent to you.",
                  variant: 'success'
                },
                isLoading: false
              });
            },
          (error) => {
            this.setState({
              snackBar: {
                message: error.message,
                variant: 'error'
              },
              isLoading: false
            })
          });
        }
      };
      return (
        <StyledLink key='forgot-password' onClick={callback}>
         Forget Password?
        </StyledLink>
      );
    };

    const disclaimer = <Disclaimer key='Disclaimer'  />;
    const welcomeGreeting = (
      <Typography key='welcomeGreeting'  variant="title" color="primary" style={{ width: "100%" }}>
        Welcome back {firstName},
      </Typography>
    );
    const doneIcon = (<DoneIcon key='logout-icon' style={{fontSize:100, color:'#00E676'}}/>)
    const hiGreeting = (
      <Typography key='hiGreeting' variant="title" color="primary" style={{ width: "100%" }}>
        Hi {firstName},
      </Typography>
    );
    const resetPasswordMessage = (
      <Typography  key='resetPasswordMessage' variant="subheading">
        Please enter in a new password to reset.
      </Typography>
    );
    const googleMessage = (
      <Typography key='googleMessage' variant="subheading">
        It looks like your account is created with Google.
      </Typography>
    );
    const linkedinMessage = (
      <Typography key='linkedinMessage' variant="subheading">
        It looks like your account is created with Linkedin.
      </Typography>
    );
    const newAccountMessage =(isHidden)=> {
      if(!isHidden){
        return <Typography key='newAccountMessage' variant="subheading">
            It look likes we don’t have an account with this email address.
          </Typography>
      }
    }
    const createPasswordMessage = (
      <Typography key='createPasswordMessage' variant="subheading">
        It looks like you don't have a password yet.
      </Typography>
    );
    const passwordField = (label,action)=>(
      <ChangeAdpter key='passwordFieldAdapter' changeHandler={this.handleChange}>
        <Password primaryAction={action} label={label} password={password} />
      </ChangeAdpter>
    );
    const signUpButton = (
      <Button key='signUpButton' className={classes.button} onClick={this.handleSignup}>
        Sign Up
      </Button>
    );
    const resetPasswordButton = (
      <Button key='resetPasswordButton' className={classes.button} onClick={this.handleUpdatePassword(routes.DASHBOARD)}>
        Update
      </Button>
    );

    const signInButton = (
      <Button  key='signInButton' 
       className={classes.button} onClick={this.handleSignin}>
        Sign In
      </Button>
    );
    const createPasswordButton = (
      <Button key='createPasswordButton' 
        className={classes.createButton}
        onClick={this.handleUpdatePassword(routes.INTRODUCTION)}
      >
        Create Password
      </Button>
    );
    const logoutMessage = ( <Typography key='logoutMessage'  variant='title' style={{textAlign:'center'}}>You have successfully logged out</Typography>)
    const signInBar = (<Grid key= 'signInBar'  container='row' alignItems='center' justify='space-between'>{signInButton} {forgetPasswordLink()}</Grid>)
    let switchLink = (onSignup) =>{
      if(onSignup){
        return footerLink(`Already have an account?`,routes.SIGN_IN,'Sign in')
      }else{
        return footerLink(`Don’t have an account?`,routes.SIGN_UP,'Sign up')
      }
    }
    let routeLabel =(onSignup) => (<Typography key={`routeLabel-${onSignup? 'Sign-up':'sign-in'}`}variant='title' color='primary' style={{width:'100%',textAlign:'center'}}>{onSignup? 'Sign up':'sign in'}</Typography>)
    
    let authView = [routeLabel(onSignupRoute),
      googleButton,
       linkedinButton,
       orLabel,
      emailAuth,
      switchLink(onSignupRoute)];
    const GoogleView = [backBar,
      welcomeGreeting,
      googleMessage,
      googleButton];
    const LinkedinView = [
      backBar,
      welcomeGreeting,
      linkedinMessage,
      linkedinButton
    ];
    let signupView = [
      backBar,
      newAccountMessage(onSignupRoute),
      routeLabel(true),
      nameFields,
      passwordField('Password',this.handleSignup),
      disclaimer,
      signUpButton
    ];
    const passwordView = [
      backBar,
      welcomeGreeting,
      passwordField('Password',this.handleSignin),
      signInBar,
      
    ];
    const resetPasswordView = [
      welcomeGreeting,
      resetPasswordMessage,
      passwordField('New Password',this.handleUpdatePassword),
      resetPasswordButton
    ];
    const createPasswordView = [
      welcomeGreeting,
      createPasswordMessage,
      googleButton,
      linkedinButton,
      orLabel,
      passwordField('New Password',this.handleUpdatePassword),
      createPasswordButton
    ];
    const logoutView =[doneIcon,
      logoutMessage,
      linkButton('go to Sign in',routes.SIGN_IN)
    ]
    let loadedView = authView;
    let gridHeight = 500;
    let cardHeight = 300;
    switch (view) {
      case AUTHENTICATION_CONTAINER.auth:
        loadedView = authView;
        cardHeight = 480;
        gridHeight = 320;
        break;
      case AUTHENTICATION_CONTAINER.google:
        loadedView = GoogleView;
        cardHeight = 350;
        gridHeight = 200;
        break;
      case AUTHENTICATION_CONTAINER.linkedin:
        loadedView = LinkedinView;
        cardHeight = 350;
        gridHeight = 200;
        break;
      case AUTHENTICATION_CONTAINER.signup:
        loadedView = signupView;
        cardHeight = 480;
        gridHeight = 350;
        break;
      case AUTHENTICATION_CONTAINER.password:
        loadedView = passwordView;
        cardHeight = 450;
        gridHeight = 300;
        break;
      case AUTHENTICATION_CONTAINER.resetPassword:
        loadedView = resetPasswordView;
        cardHeight = 450;
        gridHeight = 300;
        break;
      case AUTHENTICATION_CONTAINER.createPassword:
        loadedView = createPasswordView;
        cardHeight = 550;
        gridHeight = 400;
        break;
        case AUTHENTICATION_CONTAINER.logout:
        loadedView = logoutView;
        cardHeight = 400;
        gridHeight = 250;
        break;
      default:
        break;
    }
    return (
      <LogoInCard width={350} height={cardHeight} isLoading={isLoading} snackBar={snackBar}  >
        <Grid

          container
          className={classes.root}
          style={{ height: gridHeight }}
          alignItems="center"
          direction="column"
          justify="space-between"
        >
          {[loadedView]}
        </Grid>
      </LogoInCard>
    );
  }
}

AuthenticationContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AuthenticationContainer));
