import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
const styles = theme => ({
    content: {
    // margin:'auto',
      width:330,
      height:180,
      paddingLeft:40,
      paddingRight:40
    },

    title:{
      paddingLeft:40
    },
    button:{
        width:70
    }
  });

function ConfirmSubmission(props) {
      const {classes,isOpen,currentProcess,closeHandler} = props
      const newProcess = processContent[currentProcess]
    return (
        <Dialog
        
          open={isOpen}
          onClose={closeHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">{'Confirm Resume Submission'}</DialogTitle>
          <DialogContent  className={classes.content}>
            <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </DialogContentText>

          </DialogContent>
          <DialogActions>
          <Button className={classes.button} onClick={()=>{closeHandler()}} color="primary" autoFocus>
            Back
            </Button>
            <Button className={classes.button} onClick={()=>{closeHandler(newProcess.route)}} color="primary" autoFocus>
            {newProcess.button}
            </Button>
          </DialogActions>
        </Dialog>
    )
}
export default withStyles(styles)(ConfirmSubmission)
