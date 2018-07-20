import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import InputWrapper from "./InputWrapper";
import { TextField } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";


const styles = theme => ({
  root:{
    width:'100%',
   
  },
  textField:{
      width:'100%'
  },
  paper: {
  // backgroundColor:'#f00',
   position: 'absolute',
    zIndex:10,
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: "none"
  },chip: {
    margin: 4
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
          }
        />
        
     
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
