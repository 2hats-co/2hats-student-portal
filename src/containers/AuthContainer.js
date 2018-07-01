import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LogoInCard from '../components/LogoInCard';

import GoogleIcon from '../assets/images/social/google.svg'
import LinkedinIcon from '../assets/images/social/linkedin.svg'
import StyledLink from '../components/StyledLink';
import {validateEmail} from '../utilities/validators'
import { auth } from '../firebase';
const styles = theme => ({
  root: {
    //position: 'fixed',
    //width: 300,
    paddingLeft:26,
    paddingRight:26,
    height: 500
  },
  textField: {
    marginTop:5,
    width: '100%',
    marginBottom:30
  },
  nameTextField: {
    //marginTop:-12,
    width: '40%'
  },
  grid: {
    height: 400
  },
  
  resetButton: {
    width:100
  },
  socialButton: {
    margin:5,
    width: 250,
    height: 40,
    color: '#fff',
  },
  
  socialIcon: {
 
    marginRight: 17
  }
});
const INITIAL_STATE = {
  email: '',
  error: null,
  view:'reset'
};

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});
class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  handleResetPassword (email){
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
  componentWillMount(){
    //TODO check url , set state.view
  }
  render() {
    const { classes } = this.props;
    let socialButton = (provider, method) => (
      <Button variant='flat' style={provider === 'google' ? { backgroundColor: '#E05449' } : { backgroundColor: '#0077B5' }} className={classes.socialButton}>
        <div className={classes.socialIcon} >
          <img alt={provider} src={provider === 'google' ? GoogleIcon : LinkedinIcon} />
        </div> sign {method} with {provider}
      </Button>)

    let linkButton = (label, link) => (<StyledLink href={link}>
      {label}
    </StyledLink>)
    const emailField = (
    <TextField
      id="email"
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
      label="Password"
   //   placeholder="Password"
      className={classes.textField}
      margin="normal"
      type='password'
    />)
    const confirmPasswordField = (
      <TextField
        id="confirmPassword"
        label="Confirm Password"
      //  placeholder="Confirm Password"
        className={classes.textField}
        margin="normal"
        type='password'
      />)
    const nameFields = (<Grid
      justify='space-between'
      direction='row'
    >
      <TextField
        id="firstName"
        label="First Name"
     //   placeholder="First Name"
        className={classes.nameTextField}
        margin="normal"
        color="primary"
      />
      <TextField
        id="lastName"
        label="Last Name"
       // placeholder="Last Name"
        className={classes.nameTextField}
        margin="normal"
        color="primary"
      />
    </Grid>)
    const orLabel = (<Typography variant="button" gutterBottom>
      OR
    </Typography>)
    const signInRow = (
      <Grid container
        alignItems='center'
        justify='space-between'
        direction='row'
      >
        {linkButton('Forgot Password?', '#')}
        <Button variant='flat' className={classes.button}>
          Sign In
    </Button>
      </Grid>
    )
    const signUpButton = (<Button variant="flat" className={classes.button}>
      Sign Up
</Button>)
    const resetPasswordText = (<Grid
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
    let resetPasswordButton = (isDisable) => (<Grid container direction='row' justify='space-between' style={{width:230}}>
      <Button  variant="outlined"
     //onClick={this.handleBack}
     className={classes.resetButton}
      >
    Back
  </Button> 
  <Button 
    variant="flat" 
    disabled={isDisable} 
    className={classes.resetButton}
   onClick={()=>{this.handleResetPassword(email)}}
    >
      reset
  </Button>
  </Grid>)
    let footerLink = (label, link, linkLabel) => (
      <Grid container
        alignItems='center'
        justify='center'
        direction='row'
      >
        <Grid item xs={6}>
          <Typography variant="body1">
            {label}
          </Typography>
        </Grid>
        <Grid item xs={2} >
          {linkButton(linkLabel, link)}
        </Grid>
      </Grid>)
      const {email,error,view} = this.state
      const signInView = [socialButton('google', 'in'),socialButton('linkedin', 'in'),orLabel,emailField,passwordField,signInRow,footerLink('Don’t have an account?', '#', 'Sign Up')]
      const signUpView = [socialButton('google', 'up'),socialButton('linkedin', 'up'),orLabel,nameFields,emailField,passwordField,confirmPasswordField,signUpButton,footerLink('Already have an account?', 'signin', 'Sign In')]
      const resetView = [resetPasswordText,emailField,resetPasswordButton(!validateEmail(email))]
      let loadedView
      switch (view) {
        case 'signup':
          loadedView = signUpView
          break;
          case 'signin':
          loadedView = signInView
          break; case 'reset':
          loadedView = resetView
          break;
        default:
          break;
      }
      return (

      <LogoInCard width={350} height={360}>
        <Grid
          container
          className={classes.root}
          alignItems='center'
          direction='column'
          justify='flex-start'
        >
          {loadedView.map(x=>x)}
        </Grid>
      </LogoInCard>

    );
  }
}

AuthContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default 
//withRouter(
  withStyles(styles)(AuthContainer)
//);