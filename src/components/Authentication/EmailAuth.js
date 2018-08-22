import React,{Component} from 'react'

import Email from '../InputFields/Email'
import {checkEmail} from '../../utilities/Authentication/emailCheck'
import Button from '@material-ui/core/Button'
import { validateEmail } from '../../utilities/validators';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    marginLeft:70,
    marginTop: 17,
    marginBottom: 17,
    width: 120
  },
});

class EmailAuth extends Component {
    constructor(props){
        super(props)
        this.state ={email:''}
        this.handleChange = this.handleChange.bind(this);
        this.handleEmailCheck = this.handleEmailCheck.bind(this)
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
     };
    handleEmailCheck(){
      const {email} = this.state
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
        this.props.changeHandler('isLoading', false)
        this.props.changeHandler('email',email)
        this.props.changeHandler('view', 'signup')
      });
      }else{
        this.props.changeHandler('snackBar', {message:'invalid email format',variant:'error'})
      }
      
    }
    render(){
      const {email} = this.state
      const {classes} = this.props
        return(
            <div>
           <Email key="emailField" 
           primaryAction={this.handleEmailCheck}
           value={email} 
           changeHandler={this.handleChange}/>
          <Button key='check-button' 
            id='check-button' variant='flat'
            disabled={!validateEmail(email)}
            onClick={this.handleEmailCheck}
            className={classes.button}>
             Next
             </Button>
             </div>
        )
    }
}
export default withStyles(styles)(EmailAuth)