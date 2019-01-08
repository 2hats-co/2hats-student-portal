import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withOnEnter } from './withOnEnter';

const styles = {
  input: {
    height: 'auto',
  },
};

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
    const { classes, changeHandler, value, label, handleKeyPress } = this.props;
    return (
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="passwordField">{label || 'Password'}</InputLabel>
        <Input
          id="passwordField"
          type={this.state.showPassword ? 'text' : 'password'}
          value={value}
          fullWidth
          //   margin="normal"
          onChange={changeHandler('password')}
          onKeyPress={handleKeyPress}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                style={{ width: 30, height: 30, padding: 0 }}
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          classes={{ input: classes.input }}
        />
      </FormControl>
    );
  }
}
export default withStyles(styles)(withOnEnter(Password));
