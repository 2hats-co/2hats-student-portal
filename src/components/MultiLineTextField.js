import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputWrapper from './InputWrapper';
import { Typography, Input } from '@material-ui/core';
import {BLACK} from '../Theme'
const styles = theme => ({
    root: {
      marginTop:'10px',
      padding:'11px !important',
     height:'80px',
    // width:'100%',
     width: '380px !important',
    
      backgroundColor:'#EDEDED',
      border: '1px solid #fff',
      outline: 'none',
      resize: 'none',
      overflow: 'auto',
      borderRadius:'5px',
      color: BLACK,
      fontFamily: "Helvetica Neue",
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '0.06px'
        },
  });



class MultiLineTextField extends React.Component {

   state = { 
    characterCountValue: '',
    InputValue:''
    };

  

  componentWillMount(){
    if(this.props.characterLimit){
      this.setState({characterCountValue:`0/${this.props.characterLimit}`})
    }
    if(this.props.placeholder){
      this.setState({InputValue:this.props.placeholder})
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
    this.props.changeHandler('bio',this.state.InputValue)
    }
}
  handleChange(event){
    const value = event.target.value
    const newLength = value.length
    const maxLength = this.props.characterLimit

    if(newLength<maxLength-1){
      this.setState(
        {characterCountValue:`${newLength}/${maxLength}`,
        InputValue:value
      })
 
    }else{ 
      this.setState(
        {characterCountValue:`${newLength}/${maxLength}`,
        InputValue:value.substring(0, maxLength)
      })
      event.target.value = value.substring(0, maxLength)
 
    }

  }
  handleFocus(event){
   
    if(this.props.placeholder === event.target.value){
      this.setState({InputValue:''})
      event.target.value = ''
    }
    
  }
  render(){
    const { classes,title,label,hint,numberOfLines} = this.props;
    return(
      <div>
      {label&& <Typography variant='caption'>{label}</Typography>}
      <InputWrapper
      title={title}
      hint={hint}
      characterCounter={this.state.characterCountValue}
      child={(<textarea
      onChange={this.handleChange.bind(this)}
      onFocus={this.handleFocus.bind(this)}
      className={classes.root}rows="4" cols="50">
      {this.state.InputValue} 
      </textarea>)}
      
      />
      </div>

    )}
}
MultiLineTextField.propTypes = {
  title: PropTypes.string,
  hint: PropTypes.string,
  label:PropTypes.string,
  default:PropTypes.string, 
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(MultiLineTextField);