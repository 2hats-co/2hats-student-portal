// nlines? hintText? defaultText? char limit?
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputWrapper from './InputWrapper';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: theme.mixins.gutters({
      marginTop:'10px',
      padding:'11px !important',
      height:'94px',
      width: '400px',
      backgroundColor:'#EDEDED',
      border: '1px solid #fff',
      outline: 'none',
      resize: 'none',
      overflow: 'auto',
      borderRadius:'5px',
      color: '#9B9B9B',
      fontFamily: "Helvetica Neue",
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '0.06px'
        }),
    
  });
function MultiLineTextField(props) {
    const { classes} = props;
    return(
      <InputWrapper
      title='Personal Bio'>
      <textarea className={classes.root}rows="4" cols="50">
      For example: 
Hard-working student (80 WAM) with 3 months experience of UI design internship. I have more than 1-year of experience in using the Adobe creative suite tools, such as Adobe Photoshop and Adobe XD and would like to further utilise such skills in my future position.
      </textarea>
      </InputWrapper>
    )
}
MultiLineTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineTextField);