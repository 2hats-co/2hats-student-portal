import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


class Password extends React.Component{
    
      constructor(props){
          super(props);
          this.state = {showPassword: false};
          this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
      }
      handleClickShowPassword(){
          this.setState({showPassword:!this.state.showPassword})
      } 
    render(){
        const {changeHandler,value} = this.props
    return(
      

      <FormControl style={{width:'100%'}}>
          <InputLabel htmlFor="passwordField">Password</InputLabel>
          <Input
            id="passwordField"
            type={this.state.showPassword ? 'text' : 'password'}
            value={value}
            fullWidth
            margin="normal"
            onChange={changeHandler('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

    )
    }
    

}
export default Password

