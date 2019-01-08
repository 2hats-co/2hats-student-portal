import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function Name(props) {
  const { changeHandler, firstName, lastName } = props;
  return (
    <Grid
      key="nameFields"
      container
      justify="space-between"
      direction="row"
      style={{ width: '100%', marginTop: -20 }}
    >
      <TextField
        id="firstName"
        label="First Name"
        value={firstName}
        onChange={changeHandler('firstName')}
        style={{ width: '46%' }}
        margin="normal"
        color="primary"
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={lastName}
        onChange={changeHandler('lastName')}
        style={{ width: '46%' }}
        margin="normal"
        color="primary"
      />
    </Grid>
  );
}
export default Name;
