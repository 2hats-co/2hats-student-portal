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
  const talentPool = {
    title:"2hats Talent Pool Only",
    body:['Once you pass the profile submission, online interview and assessment centre, you will be accepted into the 2hats talent pool.',
      'In the meantime, you can check our dashboard for resume feedback and any upcoming events.' ]
  }
  const comingSoon = {
    title:'Coming Soon',
    body:['We are in the process of building the job board function and will inform you once it is ready.' ,
      'In the meantime, you can check our dashboard for resume feedback and any upcoming events.']
  }
class JobBoardContainer extends React.Component {

  handleClose = () => {
    this.props.history.push(routes.DASHBOARD)
  };
  
  render() {
      const {classes,user} = this.props
      console.log(user.id,user.stage,user.status)
      let content = talentPool
      if(user.status !=='rejected'&& user.stage === 'placed'|| user.stage ==='assessment'){
        content = comingSoon
      }
      
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{paddingLeft:40}} id="alert-dialog-title" >{content.title}</DialogTitle>
          <DialogContent className={classes.content}>
          {content.body.map(x=>  <Typography variant='body1' style={{paddingTop:10}}>{x}
            </Typography>)}
           
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
