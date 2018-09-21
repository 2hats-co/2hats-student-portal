import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputWrapper from './InputWrapper'
import InputLabel from '@material-ui/core/InputLabel';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
  root: {
    
  },
  inputField: {
    width:'100%',
 },
  placeHolderItem:{
    height:0
},
});
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }


  render() {
    const {classes,list,value,hasLabel,changeHandler,name,title,hint,label,maxWidth} = this.props;
      const InputField = ( 
          <FormControl className = {classes.inputField} style={{maxWidth:maxWidth}}>
            {hasLabel&&<InputLabel 
            htmlFor={`${name}dropDown`} 
            id={`${name}dropDown`}
            style={{textTransform:'capitalize',marginTop:1}}
            shrink={value || this.state.open}>{label}</InputLabel>} 
          <Select  
            value={value}
            onChange={(e)=>{
              changeHandler(name,e.target.value)
            }}
            onOpen={() => this.setState({open: true})}
            open={this.state.open}
            onClose={() => this.setState({open: false})}
            IconComponent={() => <DownIcon onClick={() => this.setState({open: true})} style={{opacity:.3,position:'absolute',bottom:2,right:3,cursor:'pointer'}} />}
          >
            {list.map(option=>(
            <MenuItem key={option} value={option}>{option}</MenuItem>)
            )}
          </Select>
        </FormControl>
      )
    return (
      <InputWrapper 
    title={!hasLabel?title:''}
    hint={!hasLabel?hint:''}
    collapseTopMargin={true}>
      {InputField}
      </InputWrapper>
    );
  }
}
DropDown.propTypes = {name: PropTypes.string.isRequired,
  title: PropTypes.string,
  helperLabel: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired, 
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DropDown);
