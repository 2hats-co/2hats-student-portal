// title? hint? list!
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputWrapper from "./InputWrapper";
import { TextField } from "@material-ui/core";

import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Portal from "@material-ui/core/Portal";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const styles = theme => ({
  textField:{
      width:'100%'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: "none"
  },chip: {
    margin: 4
  },
  pop:{
    width:375,
  }
});

class AutoCompleteField extends React.Component {
  state = {
    open: false,
    skillValue: "",
    filteredList: [],
    showList: false,
  };
  handleClose = val => {
    this.setState({ showList: false });
    if (typeof val != "string") return;
   
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
          child={
            <div className={classes.root}>
              <Manager>
                <Target>
                  <div
                    ref={node => {
                      this.target1 = node;
                    }}
                  >
                    <TextField
                      value={this.state.skillValue}
                      placeholder={placeholder}
                      className={classes.textField}
                      onChange={this.handleChange("skillValue")}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          const skill = this.state.skillValue;
                          if (skill !== "") {
                            this.handleClose(skill);
                          }
                        }
                      }}
                    />
                  </div>
                </Target>
                <Popper
                  placement="bottom-start"
                  eventsEnabled={showList}
                  classesName ={classes.pop}
                 // className={classNames({ [classes.popperClose]: !showList })}
                >
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <Grow
                      in={showList}
                      id="menu-list-grow"
                      style={{ transformOrigin: "0 0 0" }}
                    >
                      <Paper>
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
          }
        />
        
     
    );
  }
}
{
  /* <InputWrapper title={title} hint={hint}
         child ={ <TextField 
            onChange={this.handleChange('skill')}
         /> */
}
AutoCompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default withStyles(styles)(AutoCompleteField);
