import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  fields:{
    paddingLeft:40,
    paddingRight:40,
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}



function MobileForm(props){
    const {classes,activity,title,children,isOpen, addHandler,disabled,cancelHandler} = props

    return (
            <Dialog
            fullScreen
            open={isOpen}
            onClose={cancelHandler}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={cancelHandler} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                 {title}
                </Typography>
                <Button color="inherit" onClick={addHandler}>
                  {activity}
                </Button>
              </Toolbar>
            </AppBar>
            <List className={classes.fields}>
              {children}
            </List>
          </Dialog>
      );
    
}
MobileForm.protoTypes = {
    classes: PropTypes.object.isRequired,
    isOpen:PropTypes.boolean,
    activity: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

export default withStyles(styles)(MobileForm);