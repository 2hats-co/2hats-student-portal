import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LogoInCard from '../components/LogoInCard';
import GoogleIcon from '../assets/images/social/google.svg'
import LinkedinIcon from '../assets/images/social/linkedin.svg'
import StyledLink from '../components/StyledLink';
const styles = theme => ({
  root: {
    //position: 'fixed',
    //width: 300,
    paddingLeft:26,
    paddingRight:26,
    height: 500
  },
  textField: {
    //marginTop:-12,
    width: '100%'
  },
  nameTextField: {
    //marginTop:-12,
    width: '40%'
  },
  grid: {
    height: 400
  },
  button: {

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


class AuthContainer extends React.Component {



  render() {
    const { classes } = this.props;
    let socialButton = (provider, method) => (
      <Button variant='flat' style={provider === 'google' ? { backgroundColor: '#E05449' } : { backgroundColor: '#0077B5' }} className={classes.socialButton}>
        <div className={classes.socialIcon} >
          <img alt={provider} src={provider === 'google' ? GoogleIcon : LinkedinIcon} />
        </div> sign {method} with {provider}
      </Button>)

    let linkButton = (label, link) => (<StyledLink>
      {label}
    </StyledLink>)
    const emailField = (
    <TextField
      id="email"
      label="Email Address"
   //   placeholder="Email Address"
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
        <Button variant='flat'className={classes.button}>
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
      <Typography variant="title" color="primary">
        Reset Password
</Typography>
      <Typography variant="body">
        Please enter your email address to receive the instruction for resetting password.
</Typography>
    </Grid>)
    let resetPasswordButton = (isDisable) => (<Button 
    variant="flat" 
    disabled={isDisable} 
    className={classes.button}>
      Reset Password
  </Button>)
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
      
      const signInView = [socialButton('google', 'in'),socialButton('linkedin', 'in'),orLabel,emailField,passwordField,signInRow,footerLink('Don’t have an account?', '#', 'Sign Up')]
      const signUpView = [socialButton('google', 'up'),socialButton('linkedin', 'up'),orLabel,nameFields,emailField,passwordField,confirmPasswordField,signUpButton,footerLink('Already have an account?', '#', 'Sign In')]
      const resetView = [resetPasswordText,emailField,resetPasswordButton(false)]
      return (

      <LogoInCard>
        <Grid
          container
          spacing={16}
          className={classes.root}
          alignItems='center'
          direction='column'
          justify='center'
        >
          {signInView.map(x=>x)}
        </Grid>
      </LogoInCard>

    );
  }
}

AuthContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthContainer);