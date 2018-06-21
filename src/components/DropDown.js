// props: title? label? options! helperLabel! hint! value!, onChange binder!


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,Select,MenuItem} from '@material-ui/core'
import InputWrapper from './InputWrapper'
const styles = theme => ({
  root: theme.mixins.gutters({
     width:250,
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
  const { classes,  } = props;
    const InputField = ( 
        <FormControl className = {classes.inputField}>
        <Select  
        //  value={this.state.age}
        //  onChange={this.handleChange}
          name="age"
     //     displayEmpty
        //  className={classes.selectEmpty}
        >
          <MenuItem className={classes.placeHolderItem}
          value="select option" disabled>
          </MenuItem>
          <MenuItem value={10}>Unrestricted</MenuItem>
          <MenuItem value={20}>restricted</MenuItem>
        </Select>
      </FormControl>
    )
  return (
   <div
  className={classes.root}
   >
    <InputWrapper 
  title='Residence Status'
  hint='Your residence status is required so that we can know whether you have any work restriction.'
  >
    {InputField}
  </InputWrapper>
  </div> 
  );
}

DropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropDown);