import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as routes from '../../constants/routes';

import ChangeAdapter from '../InputFields/ChangeAdapter';
import Password from '../InputFields/Password';

import Header from './Header';
import GoogleButton from './GoogleButton';
import LinkedinButton from './LinkedinButton';

function CreatePasswordView(props) {
  const {
    firstName,
    isLoading,
    onSignupRoute,
    GTeventHandler,
    changeHandler,
    password,
    passwordAction,
  } = props;

  return (
    <React.Fragment>
      <Header greeting="Welcome back" name={firstName} />

      <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
        It looks like you don’t have a password yet.
      </Typography>

      <GoogleButton
        disabled={isLoading}
        key="google-button"
        id="google-button"
        GTevent={GTeventHandler}
        action={onSignupRoute ? 'Sign up' : 'Sign in'}
        changeHandler={changeHandler}
      />
      {/* <LinkedinButton
        disabled={isLoading}
        key="linkedin-button"
        id="linkedin-button"
        action={onSignupRoute ? 'Sign up' : 'Sign in'}
        changeHandler={changeHandler}
      /> */}

      <Typography
        variant="subtitle1"
        style={{ marginTop: 15, marginBottom: 20 }}
      >
        OR
      </Typography>

      <ChangeAdapter changeHandler={changeHandler}>
        <Password primaryAction={passwordAction} password={password} />
      </ChangeAdapter>

      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        style={{ width: 180, marginTop: 40 }}
        onClick={() => {
          passwordAction(routes.DASHBOARD);
        }}
      >
        Create password
      </Button>
    </React.Fragment>
  );
}

export default CreatePasswordView;
