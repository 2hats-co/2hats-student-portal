import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DropDown from './DropDown';
import PropTypes from 'prop-types';
import MultiLineTextField from './MultiLineTextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 550,
    width: 330

  },
  grid:{
    height:380,
    widthMax: 250+'!important'
  }
});

class DialogForm extends React.Component {
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
    console.log(this.state)
      const {title,fields,classes} = this.props

      let textField = (id,label) => ( <TextField
       // autoFocus
        margin="dense"
        id={id}
        label={label}
        type="text"
        fullWidth
      />)
      let datePicker =(label) => (<TextField
        id={label}
        label={label}
        type="date"
       // defaultValue="2017-05-29"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />)
      let discription = (
      <MultiLineTextField
        characterLimit= {200}
        label='Description'
        placeholder={`E.g.:
        - Re-created 3hats' key product page, which resulted in 50% more page visits
      - Created the wireframes and prototypes of a new feature`}
        hint='This description should focus on your key achievement in this job/position.'
      />)
    return (
      <div>
        <Button onClick={this.handleClickOpen}>+</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <Grid
            container
            className={classes.grid}
            direction='column'
            justify='space-between'
            > 
            {textField('position','Position/Job Title')}
            {textField('organisation','Organisation')}
            <DropDown label='Type of Experience' options={['volunteering','contractor','casual','part-time','full-time']} value={'ddd'} changeHandler={(v)=>{console.log(v)}}/>
            {datePicker('start date')}
            {datePicker('end/expected end date')}
            {discription}
            </Grid>
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
  classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        type:PropTypes.oneOf(['textField', 'dropDown', 'multiLineTextField','datePicker']).isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string,
        hint:PropTypes.string,
        options:PropTypes.arrayOf(PropTypes.string).isRequired
    }))
}

export default withStyles(styles)(DialogForm);