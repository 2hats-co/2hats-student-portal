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
      spacing={1}
    >
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={changeHandler('firstName')}
          variant="filled"
          color="primary"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={changeHandler('lastName')}
          variant="filled"
          color="primary"
        />
      </Grid>
    </Grid>
  );
}
export default Name;
