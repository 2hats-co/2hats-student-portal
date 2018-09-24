import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import StyledLink from "../components/StyledLink";

import DoneIcon from '@material-ui/icons/Done'
//routing
import * as routes from "../constants/routes";
import { withRouter } from "react-router-dom";
import { AUTHENTICATION_CONTAINER } from "../constants/views";

import {warmUp} from '../utilities/Authentication/warmUp'
//authentication components
import Name from "../components/InputFields/Name";
import Password from "../components/InputFields/Password";
import Disclaimer from "../components/Authentication/Disclaimer";
import EmailAuth from "../components/Authentication/EmailAuth";
import GoogleButton from "../components/Authentication/GoogleButton";
import LinkedinButton from "../components/Authentication/LinkedinButton";
import LogoInCard from "../components/LogoInCard";
import ChangeAdpter from "../components/InputFields/ChangeAdapter";

// Views
import AuthView from '../components/Authentication/AuthView';
import NoPasswordView from '../components/Authentication/NoPasswordView';
import SocialView from '../components/Authentication/SocialView';
import SignUpView from '../components/Authentication/SignUpView';
import PasswordView from "../components/Authentication/PasswordView";
import ResetPasswordView from '../components/Authentication/ResetPasswordView';
import CreatePasswordView from '../components/Authentication/CreatePasswordView';
import MessageView from '../components/Authentication/MessageView';

//utilities
import {
  createUserWithPassword,
  signInWithPassword,
  updateUserPassword
} from "../utilities/Authentication/authWithPassword";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import {auth} from '../firebase';
import { connect } from 'react-redux';
import {actionTypes} from 'redux-firestore'
import BackIcon from "@material-ui/icons/KeyboardBackspace";
const styles = theme => ({
  root: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 40,
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
    this.handleGTevent = this.handleGTevent.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }
  async componentWillMount() {
    warmUp(CLOUD_FUNCTIONS.CHECK_EMAIL)
    warmUp(CLOUD_FUNCTIONS.AUTHENTICATE_3RD_PARTY)
    const linkParams = ['firstName','smartKey']
    linkParams.forEach(x=>{
      if (this.props.history.location.search.includes(x)) {
        this.setState({
          [x]: this.props.history.location.search.split(`${x}=`)[1].split("?")[0]
        });
      }
    })
  
    if (this.props.view) {
      this.setState({ view: this.props.view });
    }
    if(this.props.view === AUTHENTICATION_CONTAINER.logout){
      await auth.doSignOut();
      this.setState({view:AUTHENTICATION_CONTAINER.logout})
      this.goTo(routes.LOG_OUT)
  }
    window.Intercom("update", {
      hide_default_launcher: true
    });
    window.Intercom("hide");
  }
 handleGTevent(name){
   window.dataLayer.push({
    'event':'VirtualPageview',
    'virtualPageURL':`/virtual/${name}-Success/`,
    'virtualPageTitle' : `${name}-Success`
    });
 }
  goTo(route) {
    this.props.history.push(route);
  }
  handleSignin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = { email, password };
    signInWithPassword(user, route =>{this.goTo(route),this.handleGTevent('Signin')},this.handleError);
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
        route => {console.log('going to '+ route);this.goTo(route);this.handleGTevent('Signup')},
        this.handleError
      );
      }else{
        this.setState({snackBar:{message:'Please enter you first and last name',variant:'error'},isLoading:false})
      }
    }
  }
 
  handleUpdatePassword(route) {
    alert('handleUpdatePassword ' + route);
    const { password,smartKey } = this.state;
    updateUserPassword(
      password,
      () => {this.goTo(route),
        cloudFunction(CLOUD_FUNCTIONS.DISABLE_SMART_LINK,{slKey:smartKey,reason:'This link has already been used'})        
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
    const {isLoading, email} = this.state;
    if(!isLoading){
      const request = { email: email };
      this.setState({isLoading:true});
      cloudFunction(CLOUD_FUNCTIONS.RESET_PASSWORD, request,
        (result) => {
          this.setState({
            snackBar: { 
              message: "We set you an email to reset your password.",
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
    const onSignupRoute = this.props.history.location.pathname === routes.SIGN_UP
    const backBar = (
      <Grid key="back-bar"
        style={{ width: "100%", 
        borderStyle:'solid',
        borderRadius:30,
        height:38,
        borderWidth:0.5,
        borderColor:'#aeaeae',
    
       }}
        container
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <IconButton
          disabled={isLoading}  
          aria-label="back"
          style={{marginLeft:4,width:32,height:32}}
          id="back-to-email"
          onClick={() => {
            this.setState({ view: AUTHENTICATION_CONTAINER.auth });
          }}
        >
          <BackIcon className={classes.iconButton} />
        </IconButton>{" "}
        <Typography variant={email.length < 30?"body1":'caption'} style={{marginLeft:5,color:'#000',maxWidth:'75%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          {email}
        </Typography>
      </Grid>
    );
    const googleButton = (
      <GoogleButton
        disabled={isLoading}
        key="google-button"
        id="google-button"
        style={{marginTop:10}}
        GTevent={this.handleGTevent}
        action={onSignupRoute?'Sign up': 'Sign in'}
        changeHandler={this.handleChange}
      />
    );
    const linkedinButton = (
      <LinkedinButton
        disabled={isLoading}
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
                  message: "We set you an email to reset your password.",
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
         Forgot password?
        </StyledLink>
      );
    };

    const disclaimer = <Disclaimer key='Disclaimer'  />;
    const doneIcon = (<DoneIcon key='logout-icon' style={{fontSize:120, color:'#00E676'}}/>)

    const GreetingWithFirstName =(greeting)=> (
      <Typography key='welcomeGreeting'  variant="title" color="primary" style={{ width: "100%" ,textAlign:'center'}}>
       {greeting} {firstName}
      </Typography>
    );
    const serviceMessage =(service)=> (
      <Typography key='serviceMessage' variant="body1">
        It looks like your account is created with {service}.
      </Typography>
    );
   
    const newAccountMessage =(isHidden)=> {
      if(!isHidden){
        return <Typography key='newAccountMessage' style={{marginBottom:10}} variant="body1">
            It looks like we don’t have an account with this email address.
          </Typography>
      }
    }
    const createPasswordMessage = (
      <Typography key='createPasswordMessage'  variant="subheading">
        It looks like you don’t have a password yet.
      </Typography>
    );
    const resetPasswordMessage = (
      <Typography  key='resetPasswordMessage' variant="subheading">
        Please type a new password below.
      </Typography>
    );
    const passwordField = (label,action)=>(
      <ChangeAdpter key='passwordFieldAdapter' changeHandler={this.handleChange}>
        <Password primaryAction={action} label={label} password={password} />
      </ChangeAdpter>
    );
    const signUpButton = (
      <Button disabled={isLoading} key='signUpButton' className={classes.button} onClick={this.handleSignup}>
        Sign up
      </Button>
    );
    /*const resetPasswordButton = (
      <Button disabled={isLoading} key='resetPasswordButton' className={classes.button} onClick={this.handleUpdatePassword(routes.DASHBOARD)}>
        Update
      </Button>
    );*/

    const signInButton = (
      <Button disabled={isLoading} key='signInButton' 
       className={classes.button} onClick={this.handleSignin}>
        Sign in
      </Button>
    );
    const createPasswordButton = (
      <Button disabled={isLoading} key='createPasswordButton' 
        className={classes.createButton}
        onClick={() => {this.handleUpdatePassword(routes.DASHBOARD)}}
      >
        Create password
      </Button>
    );
    const titleMessage =(message)=> ( <Typography key='logoutMessage'  variant='title' style={{textAlign:'center', textTransform:'none'}}>{message}</Typography>)
    const signInBar = (<Grid key= 'signInBar'  container='row' alignItems='center' justify='space-between'>{signInButton} {forgetPasswordLink()}</Grid>)
    let switchLink = (onSignup) =>{
      if(onSignup){
        return footerLink(`Already have an account?`,routes.SIGN_IN,'Sign in')
      }else{
        return footerLink(`Don’t have an account?`,routes.SIGN_UP,'Sign up')
      }
    }
    let routeLabel =(onSignup) => (<Typography key={`routeLabel-${onSignup? 'Sign-up':'sign-in'}`}
                                            variant='title' color='primary' 
                                            style={{width:'100%',
                                            textAlign:'center',
                                            marginBottom:5,
                                            //marginTop:5,
                                            }}>
                                            {onSignup? 'Sign Up':'Sign In'}
                                    </Typography>)
  /*
    const passwordView = [
      backBar,
      GreetingWithFirstName('Welcome back,'),
      passwordField('Password',this.handleSignin),
      signInBar,
    ];
    const resetPasswordView = [
      GreetingWithFirstName('Hi'),
      resetPasswordMessage,
      passwordField('New password',this.handleUpdatePassword),
      resetPasswordButton
    ];
    const createPasswordView = [
      GreetingWithFirstName('Welcome back,'),
      createPasswordMessage,
      googleButton,
      linkedinButton,
      orLabel,
      passwordField('New password',this.handleUpdatePassword),
      createPasswordButton
    ];

    const logoutView =[doneIcon,
      titleMessage('You have successfully logged out'),
      linkButton('Go to sign in',routes.SIGN_IN)
    ]*/
    const validateEmailView =[doneIcon,
      titleMessage('Thank you, we have validated your email'),
      linkButton('Go to dashboard',routes.DASHBOARD)
    ]

    let loadedView;

    switch (view) {
      case AUTHENTICATION_CONTAINER.google:
        loadedView = <SocialView type="Google"
        isLoading={isLoading} email={email} backHandler={this.handleBack}
        firstName={firstName} GTeventHandler={this.handleGTevent}
        onSignupRoute={onSignupRoute} changeHandler={this.handleChange} />;
        break;

      case AUTHENTICATION_CONTAINER.linkedin:
        loadedView = <SocialView type="LinkedIn"
        isLoading={isLoading} email={email} backHandler={this.handleBack}
        firstName={firstName}
        onSignupRoute={onSignupRoute} changeHandler={this.handleChange} />;
        break;

      case AUTHENTICATION_CONTAINER.signup:
        loadedView = <SignUpView
        isLoading={isLoading} email={email} backHandler={this.handleBack}
        onSignupRoute={onSignupRoute} changeHandler={this.handleChange}
        firstName={firstName} lastName={lastName} password={password}
        passwordAction={this.handleSignup} />;
        break;

      case AUTHENTICATION_CONTAINER.password:
        loadedView = <PasswordView
        isLoading={isLoading} email={email} backHandler={this.handleBack}
        changeHandler={this.handleChange} firstName={firstName}
        password={password} passwordAction={this.handleUpdatePassword}
        forgotPasswordHandler={this.handleForgotPassword} />;
        break;

      case AUTHENTICATION_CONTAINER.resetPassword:
        loadedView = <ResetPasswordView
        firstName={firstName} changeHandler={this.handleChange} password={password}
        passwordAction={this.handleUpdatePassword} isLoading={isLoading} />;
        break;

      case AUTHENTICATION_CONTAINER.createPassword:
        loadedView = <CreatePasswordView
        onSignupRoute={onSignupRoute} isLoading={isLoading} firstName={firstName}
        handleGTevent={this.handleGTevent} changeHandler={this.handleChange}
        password={password} passwordAction={this.handleUpdatePassword} />;
        break;

      case AUTHENTICATION_CONTAINER.logout:
        loadedView = <MessageView message="You have successfully logged out"
        destination={routes.SIGN_IN} destinationName="sign in" />;
        break;

      case AUTHENTICATION_CONTAINER.noPassword:
        loadedView = <NoPasswordView
        isLoading={isLoading} email={email} backHandler={this.handleBack}
        firstName={firstName} />;
        break;

      case AUTHENTICATION_CONTAINER.validateEmail:
        loadedView = <MessageView message="Thank you, we have validated your email"
        destination={routes.DASHBOARD} destinationName="dashboard" />;
        break;

      default:
        loadedView = <AuthView
        onSignupRoute={onSignupRoute} isLoading={isLoading}
        handleGTevent={this.handleGTevent} changeHandler={this.handleChange} />;
        break;
    }
    return (
      <LogoInCard width={320} height="auto" isLoading={isLoading} snackBar={snackBar}  >
        <Grid
          container
          className={classes.root}
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

function mapDispatchToProps(dispatch) {
  return({
      clearData: () => {dispatch({ type: actionTypes.CLEAR_DATA, preserve: { data: false, ordered: false }})}
  })
}


export default withRouter(withStyles(styles)(connect(mapDispatchToProps)(AuthenticationContainer)));
