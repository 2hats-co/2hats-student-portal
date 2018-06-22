import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,Select,MenuItem} from '@material-ui/core'
import InputWrapper from './InputWrapper'

const styles = theme => ({
  root: theme.mixins.gutters({
     width:250,
     padding:0,
  }),
  inputField: theme.mixins.gutters({
      marginTop:0,
      paddingLeft:'0 !important',
    width:'100%'
 }),
  placeHolderItem:theme.mixins.gutters({
    height:0
}),
});

function DropDown(props) {
  const {classes,options,value,changeHandler,title,hint} = props;
    const InputField = ( 
        <FormControl className = {classes.inputField}>
        <Select  
       value={value}
       onChange={changeHandler}
          name="age"
     //   displayEmpty
     //  className={classes.selectEmpty}
        >
          <MenuItem className={classes.placeHolderItem}
          value="select option" disabled>
          </MenuItem>
          {options.map(option=>(
          <MenuItem key={option} value={option}>{option}</MenuItem>)
          )}
        </Select>
      </FormControl>
    )
  return (
   <div
  className={classes.root}
   >
    <InputWrapper 
  title={title}
  hint={hint}
  child={InputField}
    />
   
  
  </div> 
  );
}
DropDown.propTypes = {
  title: PropTypes.string,
  helperLabel: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired, 
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DropDown);