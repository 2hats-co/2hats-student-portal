import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

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

function SwitchDialog(props) {
      const {classes,isOpen,currentProcess,closeHandler} = props
      const newProcess = processContent[currentProcess]
    return (
        <Dialog
        
          open={isOpen}
          onClose={closeHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">{newProcess.title}</DialogTitle>
          <DialogContent  className={classes.content}>
            <DialogContentText id="alert-dialog-description">
            {newProcess.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button className={classes.button} onClick={()=>{closeHandler()}} color="primary" autoFocus>
            Cancel
            </Button>
            <Button className={classes.button} onClick={()=>{closeHandler(newProcess.route)}} color="primary" autoFocus>
            {newProcess.button}
            </Button>
          </DialogActions>
        </Dialog>
    )
}
export default withStyles(styles)(SwitchDialog)
