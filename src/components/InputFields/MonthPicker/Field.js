import React from "react";

import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  //
});

function Field(props) {
  const {label,value,classes,name,focusedField,errorMessage,openCalendar} = props;
  const isOpen = (name===focusedField)
  return (
    <Grid container onClick={()=>{openCalendar(name,focusedField)}} direction='column' style={{marginTop:10}}>
      <FormControl style={{width:'100%'}}>
        <InputLabel htmlFor="passwordField">{label}</InputLabel>
          <Input
            type="text"
            value={value}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                style={{width:30,height:30}}
                aria-label="Dropdown"
                >
                  <DownIcon style={{opacity:.5}} />
                </IconButton>
              </InputAdornment>
            }
            style={{caretColor:'transparent'}}
          />
        </FormControl>
    </Grid>
  )
}

export default withStyles(styles)(Field);
