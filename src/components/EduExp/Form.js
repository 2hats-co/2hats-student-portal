import React from 'react';
import TextField from '@material-ui/core/TextField';
import DropDown from '../InputFields/DropDown';
import MonthPicker from '../InputFields/MonthPicker';
import AutoComplete from '../InputFields/AutoComplete';
import MultiLineTextField from '../InputFields/MultiLineTextField';
import PropTypes from 'prop-types';
import { INPUTS } from '../../constants/enums';
import Dialog from '../Dialog';

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
  type:null,
  degree:null,
  major:null,
  organisation:null,
  university:null,
  title:null,
  focusedField:{value:'',isRequired:false},
  unChanged:{value:true,isRequired:false}
};
class DialogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.isDisabled = this.isDisabled.bind(this)
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
      stateCopy.unChanged = undefined
      stateCopy.focusedField = undefined
      let newItem ={}
      this.props.fields.forEach((field)=>{
        newItem[field.name]= this.state[field.name].value
      })
     this.props.handler(newItem)
}
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (name,value) =>{
    let item = {value:value} 
    if(this.state[name]){
      item = {value:value,isRequired:this.state[name].isRequired}
    }
    if(item !== this.state[name]){
      this.setState({[name]:item,isRequired:false})
    }
    this.setState({unChanged:{value:false,isRequired:false}})
 
  }
  isDisabled(){
  let completedRequired = []
  for (const field in this.state) {
    if (this.state.hasOwnProperty(field)) {
      console.log(this.state[field])
      const element = completed(this.state[field]);
      completedRequired.push(element)
    }
  }
  console.log(completedRequired)
    return !completedRequired
    .reduce(function(a,b)
    {if(a=== false || b===false)
      {return false}
      else{return true};
    });
  }
  render() {
    const {fields,activity,title,isOpen,handler} = this.props
    const form = fields.map((field)=>{
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
          focusedField = {this.state.focusedField.value}
          key= {field.name}
          name= {field.name}
           label={field.label}
           minValue={this.state.startDate.value}
           maxValue={this.state.endDate.value}
           value={this.state[field.name]&& this.state[field.name].value}
           changeHandler={this.handleChange}
           toggle={field.toggle}
           fullWidth
         />
         case INPUTS.dropDown:return  <DropDown 
         hasLabel
         key={field.name} 
         list={field.list} 
         label={`${field.label}`}
         value={this.state[field.name]&& this.state[field.name].value}
          name={field.name}
          changeHandler={this.handleChange.bind(this)}
          style={{marginTop:-20}}
          />
          case INPUTS.autoComplete:return <AutoComplete 
          hasLabel
          focusedField = {this.state.focusedField.value}
          key= {field.name} 
          list={field.list} 
          label={field.label}
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
      characterLimit= {400}
      title={field.label}
      hasLabel
      name={field.name}
      placeholder={field.placeholder}
      hint={field.hint}
      value={this.state[field.name]&& this.state[field.name].value}
      changeHandler={this.handleChange.bind(this)}
    />
          default:break;
        }
      })
     
    return (
      
      <Dialog activity={activity} 
      title={title} isOpen={isOpen} 
      addHandler={this.handleAdd.bind(this)} 
      disabled={this.isDisabled()} 
      unChanged={this.state.unChanged.value}
      cancelHandler={()=>{handler()}}
      width={550}
      >
      {form}
      </Dialog>
    );
  }
}
DialogForm.protoTypes = {
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
export default DialogForm;
