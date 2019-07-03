import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as routes from '../../constants/routes';

import ChangeAdapter from '../InputFields/ChangeAdapter';
import Password from '../InputFields/Password';

import Header from './Header';

function ResetPasswordView(props) {
  const {
    firstName,
    changeHandler,
    password,
    passwordAction,
    isLoading,
  } = props;

  return (
    <React.Fragment>
      <Header greeting="Hello" name={firstName} />
      <Typography variant="subtitle1">
        Please type a new password below.
      </Typography>

      <div style={{ marginTop: 10, width: '100%' }}>
        <ChangeAdapter changeHandler={changeHandler}>
          <Password
            primaryAction={passwordAction}
            password={password}
            label="New Password"
          />
        </ChangeAdapter>
      </div>

      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        style={{ width: 180, marginTop: 40 }}
        onClick={() => {
          passwordAction(routes.LANDING);
        }}
      >
        Update password
      </Button>
    </React.Fragment>
  );
}

export default ResetPasswordView;
