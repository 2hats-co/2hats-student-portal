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

class ConfirmationDialog extends Component{
      render() {
        const { fullScreen,dialog,closeHandler,checkHandler} = this.props;
        console.log(dialog)
        const {title,body,confirm,checkbox} = dialog
        return (
          <div>
            <Dialog
             // fullScreen={fullScreen}
              open={true}
              onClose={closeHandler}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
              <DialogContent>
                 {body.map((x)=><Typography variant='body1'>{x}</Typography>)} 
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
                <Button onClick={closeHandler} color="primary">
                  Cancel
                </Button>
                <Button onClick={()=>{confirm.action(),closeHandler()}} disabled={checkbox&&!checkbox.isChecked} color="primary" autoFocus>
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