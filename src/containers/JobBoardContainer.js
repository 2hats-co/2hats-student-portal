import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

import {withNavigation} from '../components/withNavigation';

const styles = theme => ({
    content: {
    margin:'auto',
    padding:20,
    paddingBottom:'24px !important',
    paddingTop:0,
    width:'80% !important',
     maxWidth:330,
     maxHeight:285,
    },
    button:{
        width:180
    }
  });
class JobBoardContainer extends React.Component {

  handleClose = () => {
    this.props.history.push(routes.DASHBOARD)
  };

  render() {
      const {classes} = this.props
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{paddingLeft:40}} id="alert-dialog-title" >{"2hats Talent Pool Only"}</DialogTitle>
          <DialogContent className={classes.content}>
            <Typography variant='body1'>
Once you pass the 2hats application process, you will be accepted into the 2hats talent pool, and will gain access to this Job Board. 

In the meantime, you can check our dashboard for resume feedback and any upcoming events. 
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} id={`job-board-back-button`} variant='contained' onClick={this.handleClose} autoFocus>
            Go to Dashboard
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }
}

const enhance = compose(
  // add redux store (from react context) as a prop
  withNavigation,
  // Connect get data from fire stroe
)
export default enhance(
  withRouter(withStyles(styles)(JobBoardContainer))
)
