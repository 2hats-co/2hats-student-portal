import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withOnEnter } from './withOnEnter';

function Email(props) {
  const { changeHandler, value, handleKeyPress } = props;
  return (
    <TextField
      id="email"
      key="email"
      label="Email Address"
      onChange={changeHandler('email')}
      value={value}
      onKeyPress={handleKeyPress}
      style={{ marginTop: 0, width: '100%', marginBottom: 5 }}
      margin="normal"
      color="primary"
    />
  );
}
export default withOnEnter(Email);
