import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/VisibilityOutlined';
import VisibilityOff from '@material-ui/icons/VisibilityOffOutlined';

import { withOnEnter } from './withOnEnter';

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPassword: false };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }
  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    const { changeHandler, value, label, handleKeyPress } = this.props;
    return (
      <TextField
        id="passwordField"
        variant="filled"
        type={this.state.showPassword ? 'text' : 'password'}
        label={label || 'Password'}
        value={value}
        onChange={changeHandler('password')}
        onKeyPress={handleKeyPress}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}
export default withOnEnter(Password);
