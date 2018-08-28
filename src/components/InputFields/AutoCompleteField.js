import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import InputWrapper from "./InputWrapper";

import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/AddCircleOutline'

const styles = theme => ({
  root:{
    width:'100%',
    maxWidth:520
  },
  textField:{
    marginTop:4,
      width:'100%',
      maxWidth:520
  },
  paper: {
  // backgroundColor:'#f00',
   position: 'absolute',
    zIndex:10,
    marginRight: theme.spacing.unit * 2,
    maxHeight:240,
    overflowY: 'scroll'
    
  },
  popperClose: {
    pointerEvents: "none"
  },chip: {
    margin: 4
  },addIcon:{
    color:theme.palette.primary.light
  }
});

class AutoCompleteField extends React.Component {
  constructor(props){
    super(props);
    this.handleAdd = this.handleAdd.bind(this)
  }
  state = {
    open: false,
    skillValue: "",
    filteredList: [],
    showList: false,
  };
  handleAdd(){
    const skill = this.state.skillValue;
    if (skill !== "") {
      this.handleClose(skill);
    }
  }
  handleClose = val => {
    this.setState({ showList: false });
    if (typeof val !== "string") return;
   
    this.props.onComplete(val);
    this.setState({ skillValue:''});
  };
 
  handleChange = name => event => {
    const list = this.props.list;
    const value = event.target.value;
    const filteredList = list.filter(x =>
      x.toUpperCase().includes(value.toUpperCase())
    );
    const showList = filteredList.length > 0 && value.length > 1;
    this.setState({
      [name]: event.target.value,
      filteredList: filteredList,
      showList: showList
    });
  };
  render() {
    const { classes, title, hint ,placeholder} = this.props;
    const { showList, filteredList } = this.state;
   
  
    return (
     
        <InputWrapper
          title={title}
          hint={hint}
        ><div className={classes.root}>
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >


            {/* <FormControl style={{width:'100%'}}>
        
          <Input
            id="SkillsField"
            type='text'
            //className={classes.textField}
            value={this.state.skillValue}
            placeholder={placeholder}
            fullWidth
            onKeyPress={e => {
              if (e.key === "Enter") {
              
                this.handleAdd.bind(this)()
                
              }}}
         //   margin="normal"
           onChange={this.handleChange("skillValue")}
         //   onKeyPress={handleKeyPress}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleAdd.bind(this)}
                >
                  <AddIcon className={classes.addIcon}/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl> */}
              <Grid container direction='row'>
              <Grid item xs={10}>
               <TextField 
                value={this.state.skillValue}
                placeholder={placeholder}
                className={classes.textField}
                onChange={this.handleChange("skillValue")}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.handleAdd()
                  }
                }}
              /> </Grid>
              <Grid item xs={2}>
              <Button variant='flat' style={{marginLeft:5,height:12,borderRadius:5}} onClick={this.handleAdd}>Add</Button></Grid></Grid>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={showList}
            //
           className={classNames({ [classes.popperClose]: !showList })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={showList}
                id="menu-list-grow"
              
                style={{ transformOrigin: "0 0 0", width:390}}
              >
                <Paper className={classes.paper}>
                  <MenuList role="menu">
                    {filteredList.map(x => (
                      <MenuItem
                        key={x}
                        onClick={() => {
                          this.handleClose(x);
                        }}
                      >
                        {x}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
      </InputWrapper>
     
    );
  }
}

AutoCompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default withStyles(styles)(AutoCompleteField);
