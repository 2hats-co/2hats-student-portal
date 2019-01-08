import React from 'react';
import TextField from '@material-ui/core/TextField';

function ConfirmPassword(props) {
  const { changeHandler, value } = props;
  return (
    <TextField
      id="confirmPassword"
      key="confirmPassword"
      label="Confirm Password"
      value={value}
      onChange={changeHandler('confirmPassword')}
      style={{ marginTop: 0, width: '100%', marginBottom: 5 }}
      margin="normal"
      type="password"
    />
  );
}
export default ConfirmPassword;
