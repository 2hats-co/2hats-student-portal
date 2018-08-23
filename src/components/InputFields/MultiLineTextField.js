import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputWrapper from './InputWrapper';
import { Typography } from '@material-ui/core';
import {BLACK} from '../../Theme'
const styles = theme => ({
    root: {
      marginTop:'10px',
      padding:'11px !important',
     height:'110px',
    width:'calc(100% - 20px)',
   
      backgroundColor:'#EDEDED',
      border: '1px solid #fff',
      outline: 'none',
      resize: 'none',
      overflow: 'auto',
      borderRadius:'5px',
      color: BLACK,
      fontFamily: "Helvetica Neue",
      fontSize: '14px',
      lineHeight: '14px',
      letterSpacing: '0.06px'
        },
  });
class MultiLineTextField extends React.Component {
   state = { 
    characterCountValue: '',
    inputValue:''
    };
  componentWillMount(){
    if(this.props.characterLimit){
      this.setState({characterCountValue:`${this.props.value.length|| 0}/${this.props.characterLimit}`})
    }
    
      this.setState({inputValue:this.props.value})      
    
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
    this.props.changeHandler(this.props.name,this.state.inputValue)
    }
}
  handleChange(event){
    const value = event.target.value
    const newLength = value.length
    const maxLength = this.props.characterLimit

    if(newLength<maxLength-1){
      this.setState(
        {characterCountValue:`${newLength}/${maxLength}`,
        inputValue:value
      })
 
    }else{ 
      this.setState(
        {characterCountValue:`${newLength}/${maxLength}`,
        inputValue:value.substring(0, maxLength)
      })
      event.target.value = value.substring(0, maxLength)
 
    }

  }
  handleFocus(event){
   
    if(this.props.placeholder === event.target.value){
      this.setState({inputValue:''})
      event.target.value = ''
    }
    
  }
  render(){
    const { hasLabel,classes,title,hint,placeholder} = this.props;
    return(
      <div style={{width:'100%'}}>
      <InputWrapper
      hasLabel={hasLabel}
      title={title}
      hint={hint}
      tip={`For Example: \n ${placeholder}`}
      characterCounter={this.state.characterCountValue}
      ><textarea
      onChange={this.handleChange.bind(this)}
      onFocus={this.handleFocus.bind(this)}
      className={classes.root}rows="4" cols="50"
      placeholder={`Write your ${title} here`}
      value={this.state.inputValue}>
      </textarea></InputWrapper>
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