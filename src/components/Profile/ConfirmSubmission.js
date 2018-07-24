import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '../../../node_modules/@material-ui/core';
const styles = theme => ({
    content: {
      width:500,
      height:120,
      paddingLeft:40,
      paddingRight:40
    },
    title:{
      paddingLeft:40
    },
    button:{
        width:100
    }
  });

function ConfirmSubmission(props) {
      const {classes,isOpen,closeHandler} = props
    return (
        <Dialog
          open={isOpen}
          onClose={closeHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">{'Confirm Resume Submission'}</DialogTitle>
          <DialogContent  className={classes.content}>
            <Typography variant='body1'>
            Since you won’t be able to submit another resume until receiving the feedback for this one, please make sure you have checked all your inputs in this submission. We are looking forward to reviewing your resume and giving you a tailored feedback and eventually matching you with a job you are interested in!
            </Typography>
          </DialogContent>
          <DialogActions>
          <Button className={classes.button} onClick={()=>{closeHandler()}} color="primary" autoFocus>
            Back
            </Button>
            <Button className={classes.button} onClick={()=>{closeHandler()}} color="primary" autoFocus>
            Submit
            </Button>
          </DialogActions>
        </Dialog>
    )
}
export default withStyles(styles)(ConfirmSubmission)
