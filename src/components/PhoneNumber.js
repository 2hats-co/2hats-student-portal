//props: onChangeBind!
//TODO: digits only 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core'
import InputWrapper from './InputWrapper'
const styles = theme => ({
  root: theme.mixins.gutters({
     width:250,
  }),
  inputField: theme.mixins.gutters({
      marginTop:10,
      paddingLeft:'0 !important',
    width:'100%'
 }),
});

function PhoneNumber(props) {
  const { classes } = props;
    const InputField = (   <TextField
        className={classes.inputField}
        id="phoneNumber"
        placeholder="e.g. 0400 000 000"
        
        margin="normal"
        color="primary"
      />)
  return (
   <div
  className={classes.root}
   >
    <InputWrapper 
  title='mobile number'
  hint='Your mobile number is required so that we can contact you for a phone interview.'
  
  >
    {InputField}
  </InputWrapper>
  </div> 
  );
}

PhoneNumber.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneNumber);