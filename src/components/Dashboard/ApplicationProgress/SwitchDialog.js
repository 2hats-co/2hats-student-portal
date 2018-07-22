import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import * as routes from '../../../constants/routes'

const uploadContent = {title:'Switch to Uploading Resume',
                        body:'You are about to upload your resume instead of building a version on our platform. All your progress will be archieved on the dashboard and used to fill in some sections while uploading your resume.',
                        button:'Upload',route:routes.UPLOAD_RESUME}
const buildContent = {title:'Switch to Building Resume',
                        body:'You are about to starting building the rest of your resume instead of uploading an existing version. All your progress will be archieved on the dashboard and used to fill in some sections while building your resume.',
                        button:'Build',route:routes.BUILD_RESUME}
const processContent = {
    upload:buildContent,
    build:uploadContent
}
const styles = theme => ({
    content: {
    // margin:'auto',
      width:330,
      height:80,
      paddingLeft:40,
      paddingRight:40
    },

    title:{
      paddingLeft:40,
      paddingTop:40
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
            <Typography variant='body1'>
            {newProcess.body}
            </Typography>
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
