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
      this.props.changeHandler('isLoading',true)
      checkEmail(this.state.email, (result) => {
        const { firstName, provider } = result.data;

        this.props.changeHandler('isLoading', false)
        this.props.changeHandler('email', this.state.email)
        this.props.changeHandler('firstName', firstName)
        this.props.changeHandler('view', provider)
      }, (error) => {
        this.props.changeHandler('isLoading', false)
        this.props.changeHandler('email', this.state.email)
        this.props.changeHandler('view', 'signup')
      });
    }
    render(){
      const {email} = this.state
      const {classes} = this.props
        return(
            <div>
           <Email key="emailField" 
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