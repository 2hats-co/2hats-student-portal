import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,Select,MenuItem,Typography} from '@material-ui/core'
import InputWrapper from './InputWrapper'
import InputLabel from '@material-ui/core/InputLabel';
const styles = theme => ({
  root: {
    
  },
  inputField: {
    width:'100%'
 },
  placeHolderItem:{
    height:0
},
});
function DropDown(props) {
  const {classes,list,value,hasLabel,changeHandler,name,title,hint,label} = props;
  console.log(name,value)
    const InputField = ( 
        <FormControl className = {classes.inputField}>
           {hasLabel&&<InputLabel 
          shrink={typeof value !=='undefined' } 
          htmlFor={`${name}dropDown`} 
          id={`${name}dropDown`}
          style={{textTransform:'capitalize'}}>{label}</InputLabel>} 
        <Select  
      
       value={value}
       onChange={(e)=>{
         changeHandler(name,e.target.value)
        }}
        >
          <MenuItem value="">
              <em></em>
            </MenuItem>
          {list.map(option=>(
          <MenuItem key={option} value={option}>{option}</MenuItem>)
          )}
        </Select>
      </FormControl>
    )
  return (
    <InputWrapper 
  title={!hasLabel?title:''}
  hint={!hasLabel?hint:''}>
    {InputField}
    </InputWrapper>
  );
}
DropDown.propTypes = {name: PropTypes.string.isRequired,
  title: PropTypes.string,
  helperLabel: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired, 
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DropDown);