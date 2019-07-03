import React from 'react';
import Typography from '@material-ui/core/Typography';

import BackBar from './BackBar';
import Header from './Header';
import GoogleButton from './GoogleButton';
import LinkedinButton from './LinkedinButton';

function SocialView(props) {
  const {
    type,
    isLoading,
    email,
    backHandler,
    firstName,
    GTeventHandler,
    onSignupRoute,
    changeHandler,
    goTo,
  } = props;

  return (
    <React.Fragment>
      <BackBar isLoading={isLoading} email={email} backHandler={backHandler} />
      <Header greeting="Welcome back" name={firstName} />
      <Typography variant="body2" style={{ marginBottom: 10 }}>
        It looks like your account was created with {type}.
      </Typography>

      {type === 'Google' ? (
        <GoogleButton
          disabled={isLoading}
          key="google-button"
          id="google-button"
          GTevent={GTeventHandler}
          action={onSignupRoute ? 'Sign up' : 'Sign in'}
          changeHandler={changeHandler}
          goTo={goTo}
        />
      ) : null}
      {type === 'LinkedIn' ? (
        <LinkedinButton
          disabled={isLoading}
          key="linkedin-button"
          id="linkedin-button"
          action={onSignupRoute ? 'Sign up' : 'Sign in'}
          changeHandler={changeHandler}
        />
      ) : null}
    </React.Fragment>
  );
}

export default SocialView;
