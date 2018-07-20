import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

import DashboardWrapper from '../components/DashboardWrapper';

const styles = theme => ({
    content: {
    margin:'auto',
     width:330,
     height:285,
    },
    button:{
        width:150
    }
  });
class JobBoardContainer extends React.Component {

  handleClose = () => {
    this.props.history.push(routes.DASHBOARD)
  };

  render() {
      const {classes} = this.props
    return (
      <DashboardWrapper>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Accepted Students Only"}</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description">
Once you pass the assessment centre, you will be accepted into the 2hats talent pool. 
This job board will allow you to review open positions and enable direct communication with position providers. 
In the meantime, you can check our dashboard for resume feedback and any upcoming events. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={this.handleClose} color="primary" autoFocus>
            Go to Dashboard
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardWrapper>
    );
  }
}

export default withRouter(withStyles(styles)(JobBoardContainer))
