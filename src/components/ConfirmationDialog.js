import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'sp2-material-ui/core/Button';
import Dialog from 'sp2-material-ui/core/Dialog';
import DialogActions from 'sp2-material-ui/core/DialogActions';
import DialogContent from 'sp2-material-ui/core/DialogContent';
import DialogTitle from 'sp2-material-ui/core/DialogTitle';
import withMobileDialog from 'sp2-material-ui/core/withMobileDialog';
import Checkbox from 'sp2-material-ui/core/Checkbox';
import FormControlLabel from 'sp2-material-ui/core/FormControlLabel';
import Typography from 'sp2-material-ui/core/Typography';
import Grid from 'sp2-material-ui/core/Grid'
class ConfirmationDialog extends Component{
      render() {
        const { dialog,closeHandler,checkHandler} = this.props;
        const {title,body,confirm,checkbox} = dialog
        return (
          <div>
            <Dialog
              open={true}
              onClose={closeHandler}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <Grid container style={{minHeight:50}} direction='row' justify='flex-start'>
                 {body.map((x)=><Grid style={{paddingBottom:2}}  item sx={12}><Typography variant='body1'>{x}</Typography></Grid>)} 
                </Grid>
                {checkbox&&<FormControlLabel style={{paddingTop:10}}  
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