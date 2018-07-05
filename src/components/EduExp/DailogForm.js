import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DropDown from '../DropDown';
import PropTypes from 'prop-types';
import MultiLineTextField from '../MultiLineTextField';
import { withStyles } from '@material-ui/core/styles';
import { INPUTS } from '../../constants/enums';
import * as _ from 'lodash'

const styles = theme => ({
  
  root:{
 
   
  },content:{
    paddingLeft:0,
    paddingRight:0,
  },
  actions:{
 
  },
  grid:{
    paddingLeft:40,
    paddingRight:40,
    width:330,
    height:416
  }

});

function completed(field){
 if(field.isRequired){
   if(field.value===''){  
     return false
   }else return true
 }else return true
}
class DialogForm extends React.Component {
  state = {
    aaa:''

  };
  
  componentDidUpdate(prevProps, prevState){
    console.log('new props',this.props)
    console.log('state',this.state)
    const {fields} = this.props
    
    if (prevProps.data !== this.props.data) {
      fields.forEach((field)=>{
        this.setState({[field.name]:{value:'',isRequired:field.isRequired}})})
      console.log('new props',this.props)
    } 
    
  }
  handleClickOpen = () => {
   // this.setState({ open: true });
  };
  componentWillMount(){
    const {fields} = this.props
    fields.forEach((field)=>{
     this.setState({[field.name]:{value:'',isRequired:field.isRequired}})})

  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (name,value) =>{
 
    const isRequired = this.state[name].isRequired
    
   this.setState({[name]:{value:value,isRequired:isRequired}})
  }
  isDisabled(){
  const completedRequired = _.map(this.state,completed)
    return !completedRequired
    .reduce(function(a,b)
    {if(a=== false || b===false)
      {return false}else{return true};
    });
  }

  render() {
    console.log(this.state)
      const {title,fields,classes,handler,isOpen} = this.props
    return (
      <div>
        <Dialog 
          className={classes.root}
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle style={{paddingLeft:40,paddingBottom:0}} id="form-dialog-title">{title}</DialogTitle>
          <DialogContent className={classes.content}>
            <Grid
            container
            className={classes.grid}
            direction='column'
            justify='flex-start'
            > 
            {fields.map((field)=>{
              switch (field.type) {
                case INPUTS.textField:return <TextField
                key= {field.name}
                 margin="dense"
                  placeholder={field.placeholder}
                 label={field.label}
                 value={field.value}
                 onChange={(event)=>{this.handleChange(field.name,event.target.value)}}
                 type="text"
                 fullWidth
               />
               case INPUTS.dropDown:return  <DropDown label={field.label} 
               key= {field.name} 
               options={field.options} 
                value={field.value} 
                name={field.name}
                changeHandler={this.handleChange.bind(this)}
                //changeHandler={(v)=>{console.log(v)}}
                />
              case INPUTS.datePicker:return <TextField
              key= {field.name}
              id={field.name}
              label={field.label}
              type="date"
             // defaultValue="2017-05-29"
                onChange={(event)=>{this.handleChange(field.name,event.target.value)}}
                fullWidth
                InputLabelProps={{
                shrink: true,
              }}
            />
            case INPUTS.multiLine:return <MultiLineTextField
            key= {field.name}
            characterLimit= {200}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            hint={field.hint}
            value={field.value}
            changeHandler={this.handleChange.bind(this)}
            value=''
          />
                default:break;
              }
            }
            )}
            </Grid>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button variant="text"  onClick={()=>{handler()}}>
              Cancel
            </Button>
            <Button variant="text" disabled={this.isDisabled()} onClick={()=>{
             handler( _.omit(_.reduce(this.state,(r,v, k)=>{
               let newObject = {[k]:v.value}
               return {...r,...newObject}
              }),['isRequired','value']))
  //             handler({degree:"Bachelor of Commerce - Accounting",university:"University of New South Wales",startDate:"Feb 2016",endDate:"Dec 2017",description:`- 85+ WAM
  // - Winner of FMAA Management Consulting Case Competition
  // - President of AIESEC UNSW`})
  }} >
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
  isOpen:PropTypes.boolean,
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        type:PropTypes.oneOf([INPUTS.textField,INPUTS.datePicker,INPUTS.dropDown,INPUTS.multiLine]).isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string,
        value:PropTypes.any,
        hint:PropTypes.string,
        options:PropTypes.arrayOf(PropTypes.string)
    })).isRequired
}

export default withStyles(styles)(DialogForm);