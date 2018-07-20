import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,Select,MenuItem, FormLabel,Typography} from '@material-ui/core'
import InputWrapper from './InputWrapper'

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
  const {classes,list,value,changeHandler,name,title,hint,label} = props;
    const InputField = ( 
        <FormControl className = {classes.inputField}>
          {label&& <Typography variant='caption'>{label}</Typography>}
        <Select  
       value={value}
       onChange={(e)=>{
         changeHandler(name,e.target.value)
        }}
        >
          <MenuItem className={classes.placeHolderItem}
          value="select option" disabled>
          </MenuItem>
          {list.map(option=>(
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