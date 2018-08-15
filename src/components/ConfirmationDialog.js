import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '../../node_modules/@material-ui/core';
import Grid from '@material-ui/core/Grid'
class ConfirmationDialog extends Component{
      render() {
        const { dialog,closeHandler,checkHandler} = this.props;
        console.log(dialog)
        const {title,body,confirm,checkbox} = dialog
        return (
          <div>
            <Dialog
              open={true}
              onClose={closeHandler}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <Grid container style={{height:50}} direction='row' justify='flex-start'>
                 {body.map((x)=><Grid item sx={12}><Typography variant='body1'>{x}</Typography></Grid>)} 
                </Grid>
                {checkbox&&<FormControlLabel
          control={
            <Checkbox
              checked={checkbox.isChecked}
              onChange={checkHandler}
              color="primary"
            />
          }
          label={checkbox.label}
        />}
              </DialogContent>
              <DialogActions>
                <Button 
                onClick={closeHandler} 
                variant='contained'>
                  Cancel
                </Button>
                <Button variant='contained'
                onClick={()=>{confirm.action(),closeHandler()}}
                 disabled={checkbox&&!checkbox.isChecked}
                  autoFocus>
                  {confirm.label}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
}

ConfirmationDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object,
    title:PropTypes.string,
    body:PropTypes.string,
    condition:PropTypes.string,
    closeHandler:PropTypes.func,
    confirm:PropTypes.object
  };
  export default withMobileDialog()(ConfirmationDialog);