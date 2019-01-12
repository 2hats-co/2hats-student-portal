import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ChangeAdapter from '../InputFields/ChangeAdapter';
import Password from '../InputFields/Password';
import StyledLink from '../StyledLink';

import BackBar from './BackBar';
import Header from './Header';

function PasswordView(props) {
  const {
    isLoading,
    email,
    backHandler,
    changeHandler,
    firstName,
    password,
    passwordAction,
    forgotPasswordHandler,
  } = props;

  return (
    <React.Fragment>
      <BackBar isLoading={isLoading} email={email} backHandler={backHandler} />
      <Header greeting="Welcome back" name={firstName} />

      <ChangeAdapter changeHandler={changeHandler}>
        <Password primaryAction={passwordAction} password={password} />
      </ChangeAdapter>

      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ marginTop: 40 }}
      >
        <Button
          disabled={isLoading}
          onClick={passwordAction}
          style={{ width: 120 }}
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
        <StyledLink onClick={forgotPasswordHandler}>
          Forgot password?
        </StyledLink>
      </Grid>
    </React.Fragment>
  );
}

export default PasswordView;
