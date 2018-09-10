import React,{Component} from 'react'

import Email from '../InputFields/Email'
import {checkEmail} from '../../utilities/Authentication/emailCheck'
import Button from '@material-ui/core/Button'
import { validateEmail } from '../../utilities/validators';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Validator from 'mailgun-validate';


const styles = theme => ({
  button: {
    
    width: 120
  },
  grid:{
    height:140
  },
  text:{
    paddingBottom:10
  },
  link:{
    color: theme.palette.primary.light,
    cursor:'pointer',
    textDecoration: 'underline',

    '&:hover':{
      textDecoration: 'underline'
    }
  }
});
var validator = new Validator('pubkey-39aac6f76384240d4c4b3a2b1afeaf02');
class EmailAuth extends Component {
    constructor(props){
        super(props)
        this.state ={email:'',invalidEmail:false}
        this.onNext = this.onNext.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleEmailCheck = this.handleEmailCheck.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
        this.handleValidEmail = this.handleValidEmail.bind(this)
        this.handleInvalidEmail = this.handleInvalidEmail.bind(this)
        this.handleEmailSuggestion = this.handleEmailSuggestion.bind(this)
    }
    handleInvalidEmail(){
      this.props.changeHandler('isLoading', false)
      this.props.changeHandler('snackBar', {message:'invalid email address',variant:'error'})
    }
    handleValidEmail(hasSuggestion){
      this.props.changeHandler('isLoading', false)
      this.props.changeHandler('email',this.state.email)
      this.setState({invalidEmail:false})
      if(!hasSuggestion){
        this.ha
        this.props.changeHandler('view', 'signup')
      }
    }
    handleEmailSuggestion(emailSuggestion){
      this.setState({emailSuggestion})
    }
    handleValidation(email){
      const _validEmail = this.handleValidEmail
      const _invalidEmail = this.handleInvalidEmail
      const _emailSuggestion = this.handleEmailSuggestion
      validator.validate(email, function(err, response) {
        if (err) {
          _validEmail(false)
            console.log(err)
            return;
        }
        if (response.is_valid) {
          console.log('valid',response)
           _validEmail(response.did_you_mean)
           // Email valid
           if (response.did_you_mean) {
            _emailSuggestion(response.did_you_mean)
              // Did your mean response.did_you_mean?
          }
        }
        else {
          console.log(response)
          _invalidEmail()
        // Email invalid
            if (response.did_you_mean) {
              _emailSuggestion(response.did_you_mean)
                // Did your mean response.did_you_mean?
            }
        }
    })
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
     };
    handleEmailCheck(email){
      if(validateEmail(email)){
        this.props.changeHandler('isLoading',true)
       
      checkEmail(email, (result) => {
        const { firstName, provider } = result.data;
        this.props.changeHandler('isLoading', false)
        this.props.changeHandler('email',email)
        this.props.changeHandler('firstName', firstName)
        this.props.changeHandler('view', provider)
        this.props.changeHandler('snackBar',null)

      }, (error) => {
        // user doesn't exist
        this.handleValidation(email) 
      });
      }else{
      
        this.props.changeHandler('snackBar', {message:'invalid email format',variant:'error'})
      }
      
    }
    onNext(){
      this.props.changeHandler('snackBar',null)
      this.setState({emailSuggestion:null})
      this.handleEmailCheck(this.state.email)
    }
    render(){
      const {email,emailSuggestion,invalidEmail} = this.state
      console.log(this.state)
      const {classes} = this.props
        return(
            <Grid className={classes.grid} container direction='column' alignItems='center' justify='space-around'>
           <Email key="emailField" 
           primaryAction={this.onNext}
           value={email} 
           changeHandler={this.handleChange}/>
           {emailSuggestion&&<Typography variant='body1' className={classes.text}>
    Do you mean: <b><a className={classes.link} 
    onClick={()=>{ this.setState({email:emailSuggestion}),this.handleEmailCheck(emailSuggestion)}
    }>{emailSuggestion}</a></b>{!invalidEmail&&<a className={classes.link} style={{color:'#000'}}
    onClick={()=>{this.handleValidEmail(false)}
    }>(Ignore)</a>}
    </Typography>}
          <Button key='check-button' 
            id='check-button' variant='flat'
            disabled={!validateEmail(email)}
            onClick={this.onNext}
            className={classes.button}>
             Next
             </Button>
             </Grid>
        )
    }
}
export default withStyles(styles)(EmailAuth)