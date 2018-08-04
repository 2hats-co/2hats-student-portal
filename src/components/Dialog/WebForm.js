import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root:{
    },content:{
      paddingLeft:0,
      paddingRight:0,
    },
    actions:{
   
    },
    grid:{
      paddingLeft:40,
      paddingRight:40
    }
  });

function WebForm(props){
    const {classes,activity,title,children,isOpen, addHandler,disabled,cancelHandler,width} = props
    
    return(
        <Dialog 
        className={classes.root}
        open={isOpen}
        //onClose={cancelHandler} TODO: show snack bar to suggest save or cancel
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle style={{paddingLeft:40,paddingBottom:0}} id="form-dialog-title">{activity} {title}</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid
          container
          className={classes.grid}
          style={{maxWidth:width}}
          direction='column'
          justify='flex-start'
          > 
          {children}
          </Grid>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button variant="text"  onClick={cancelHandler}>
              Cancel
            </Button>
            <Button disabled={disabled} 
            color='inherit' onClick={addHandler} style={{color:'#000'}}>
              {activity==='Edit'?'Save':activity }
            </Button>
          </DialogActions>
        </Dialog>
    )
}
WebForm.protoTypes = {
    title: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    isOpen:PropTypes.boolean,
  }

export default withStyles(styles)(WebForm);