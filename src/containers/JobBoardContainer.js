import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

import DashboardWrapper from '../components/DashboardWrapper';


const styles = theme => ({
    content: {
    margin:'auto',
    padding:20,
    paddingTop:0,
     maxWidth:330,
     maxHeight:285,
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
          <DialogTitle id="alert-dialog-title">{"2hats Talent Pool Only"}</DialogTitle>
          <DialogContent className={classes.content}>
            <Typography variant='body1'>
Once you pass the 2hats application process, you will be accepted into the 2hats talent pool, and will gain access to this Job Board. 

In the meantime, you can check our dashboard for resume feedback and any upcoming events. 
            </Typography>
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
