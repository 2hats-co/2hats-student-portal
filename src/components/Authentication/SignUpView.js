import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ChangeAdapter from '../InputFields/ChangeAdapter';
import Name from '../InputFields/Name';
import Password from '../InputFields/Password';

import BackBar from './BackBar';
import Header from './Header';
import Disclaimer from './Disclaimer';

function SignUpView(props) {
  const {
    isLoading,
    email,
    backHandler,
    onSignupRoute,
    changeHandler,
    firstName,
    lastName,
    password,
    passwordAction,
  } = props;

  return (
    <React.Fragment>
      <BackBar isLoading={isLoading} email={email} backHandler={backHandler} />
      <Header greeting="Sign Up" />

      {onSignupRoute ? null : (
        <Typography variant="body1">
          It looks like we don’t have an account with this email address.
        </Typography>
      )}

      <div style={{ marginTop: 10 }}>
        <ChangeAdapter changeHandler={changeHandler}>
          <Name firstName={firstName} lastName={lastName} />
        </ChangeAdapter>
        <ChangeAdapter changeHandler={changeHandler}>
          <Password primaryAction={passwordAction} password={password} />
        </ChangeAdapter>
      </div>

      <Disclaimer />

      <Button
        disabled={isLoading}
        onClick={passwordAction}
        style={{ width: 120 }}
      >
        Sign up
      </Button>
    </React.Fragment>
  );
}

export default SignUpView;
