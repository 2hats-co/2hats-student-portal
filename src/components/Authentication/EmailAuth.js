import React,{Component} from 'react'

import Email from '../InputFields/Email'
import {checkEmail} from '../../utilities/Authentication/emailCheck'
import Button from '@material-ui/core/Button'
import { validateEmail } from '../../utilities/validators';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
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
    }
    componentWillMount() {
      checkEmail('wakeup', o => {return o => o})
    }
    handleChange = name => event => {
        if(name==='email'){
          if(event.target.value.length ===4){
            checkEmail('wakeup', o => {return o => o})
          }
        }
        this.setState({
          [name]: event.target.value,
        });
      };
    render(){
      const {email} = this.state
      const {classes} = this.props
        return(
            <div>
           <Email key="emailField" value={email} changeHandler={this.handleChange} />
          <Button key='check-button'  id='check-button' variant='flat'
            disabled={!validateEmail(email)}  onClick={()=>{checkEmail(this.state.email,(o)=>{console.log(o)})}} className={classes.button}>
             Next 
             </Button>
             </div>
        )
    }
}
export default withStyles(styles)(EmailAuth)