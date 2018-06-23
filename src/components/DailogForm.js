import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DropDown from './DropDown';
import PropTypes from 'prop-types';

export default class DialogForm extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      const {title,fields} = this.props

      let textField = (id,label) => ( <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
      />)
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {textField()}
            <DropDown options={['aaa','bbb','ccc']} value={'ddd'} changeHandler={(v)=>{console.log(v)}}/>
          </DialogContent>
          <DialogActions>
            <Button variant="text"  onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="text" color='primary' onClick={this.handleClose} >
              Add 
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
DialogForm.protoTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        type:PropTypes.oneOf(['textField', 'dropDown', 'multiLineTextField','datePicker']).isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string,
        hint:PropTypes.string,
        options:PropTypes.arrayOf(PropTypes.string).isRequired
    }))
}