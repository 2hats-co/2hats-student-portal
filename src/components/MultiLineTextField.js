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
     // width: '400px',
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
    const { classes,title,label,hint,placeholder,characterLimit,numberOfLines} = props;
    return(
      <div>
      {label&& <Typography variant='caption'>{label}</Typography>}
      <InputWrapper
      title={title}
      hint={hint}
      child={(<textarea className={classes.root}rows="4" cols="50">
      {placeholder} 
      </textarea>)}
      />
      </div>

    )
}
MultiLineTextField.propTypes = {
  title: PropTypes.string,
  hint: PropTypes.string,
  label:PropTypes.string,
  default:PropTypes.string, 
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineTextField);