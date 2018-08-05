import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { EDU } from '../../constants/dialogFormFields';

function DeleteDialog(props) {
      const {name,heading,subheading,deleteHandler,cancelHandler} = props
    return (
      <div>
        <Dialog
          open={true}
          onClose={cancelHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete {name ===EDU ?"Education": 'Practical Experience'}</DialogTitle>
          <DialogContent>
           <Typography variant='subheading'>
           {heading}
           </Typography>
           <Typography variant='body1'>
           {subheading}
           </Typography>
           <Typography variant='body1'>
           You are about to delete all information associated with the above {name ===EDU ?'degree/course.': 'position/job title.'} 
           </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelHandler}>
              Cancel
            </Button>
            <Button onClick={deleteHandler} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default DeleteDialog;