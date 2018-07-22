import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DropDown from '../InputFields/DropDown';
import MonthPicker from '../InputFields/MonthPicker';
import PropTypes from 'prop-types';
import MultiLineTextField from '../InputFields/MultiLineTextField';
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

  }

});

function completed(field){
 if(field){
  if(field.isRequired){
    if(field.value===''){  
      return false
    }else return true
  }else return true
 }
 
}
const initialState = {
  aaa:'',
  type:null,
  degree:null,
  major:null,
  company:null,
  university:null,
  title:null
};

class DialogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this)
}
 
  componentDidUpdate(prevProps){
  
    const {fields} = this.props
  
    if (prevProps !== this.props) {
      this.state = initialState;
    this.setState(initialState);
      fields.forEach((field)=>{
        this.setState({[field.name]:{value:'',isRequired:field.isRequired}})})

    } 
    
  }
  
  componentWillMount(){
    const {fields} = this.props

   fields.forEach((field)=>{
   this.setState({[field.name]:{value:field.value||'',isRequired:field.isRequired}})})

  }
  
  handleAdd = () =>{
      let stateCopy = Object.assign(this.state,{})
      Object.keys(stateCopy).forEach((key) => (stateCopy[key] == null) && delete stateCopy[key]);
      const newItem =  _.reduce(stateCopy,(r,v, k)=>{
          let newObject = {[k]:v.value}
          return {...r,...newObject}
       })
      this.props.handler(_.omit(newItem,['isRequired','value']))
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
      {return false}
      else{return true};
    });
  }

  render() {
  
      const {activity,title,fields,classes,handler,isOpen} = this.props
    return (
      <div>
        <Dialog 
          className={classes.root}
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle style={{paddingLeft:40,paddingBottom:0}} id="form-dialog-title">{activity} {title}</DialogTitle>
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
                 value={this.state[field.name]&& this.state[field.name].value}
                 onChange={(event)=>{this.handleChange(field.name,event.target.value)}}
                 type="text"
                 fullWidth
               />
               case INPUTS.monthPicker:return <MonthPicker
                key= {field.name}
                name= {field.name}
                 label={field.label}
                 value={this.state[field.name]&& this.state[field.name].value}
                 changeHandler={this.handleChange}
                 toggle={field.toggle}
                 fullWidth
               />
               case INPUTS.dropDown:return  <DropDown label={field.label} 
               key= {field.name} 
               list={field.list} 
               value={this.state[field.name]&& this.state[field.name].value}
                name={field.name}
                changeHandler={this.handleChange.bind(this)}

                />
              case INPUTS.datePicker:return <TextField
              key= {field.name}
              id={field.name}
              label={field.label}
              type="date"
              value={this.state[field.name]&& this.state[field.name].value}
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
            value={this.state[field.name]&& this.state[field.name].value}
            changeHandler={this.handleChange.bind(this)}
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
            <Button disabled={this.isDisabled()} 
            color='inherit' onClick={this.handleAdd} style={{color:'#000'}}>
              {activity}
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
  activity: PropTypes.string.isRequired,
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