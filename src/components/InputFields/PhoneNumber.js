//props: onChangeBind!
//TODO: digits only 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core'
import InputWrapper from './InputWrapper'
import { renderComponent } from 'recompose';
import NumberFormat from 'react-number-format';
const styles = theme => ({
  root:{
     width:250,
  },
  inputField:{
    width:250
  }

});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      prefix={''}
      format="#### ### ###"
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
}

class PhoneNumber extends React.Component {
  state = {
    number: '',
  };
  componentWillMount(){
    const {value}= this.props
    if(value){
      this.setState({number:value})
    }

  }
  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
    this.props.changeHandler('phoneNumber',this.state.number)
    }
}
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render(){
  const { classes } = this.props;
  const { number } = this.state;
    const InputField = (
      <TextField
      className={classes.inputField}
      placeholder='e.g. 0400 000 000'
      value={number}
      onChange={this.handleChange('number')}
      id="phoneNumber"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />)
  return (
   <div
  className={classes.root}
   >
    <InputWrapper 
  title='mobile number (Optional)'
  hint='Your mobile number is required so that we can contact you for a phone interview.'
  child =  {InputField}
  />
   
  </div> 
  );
}
}
PhoneNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(PhoneNumber);