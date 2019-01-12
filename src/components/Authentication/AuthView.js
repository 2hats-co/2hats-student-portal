import React from 'react';
import Typography from '@material-ui/core/Typography';

import * as routes from '../../constants/routes';

import Header from './Header';
import GoogleButton from './GoogleButton';
import LinkedinButton from './LinkedinButton';
import EmailAuth from './EmailAuth';
import withStyles from '@material-ui/core/styles/withStyles';

import womanGraphic from '../../assets/images/graphics/SignUpWoman.svg';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  womanGraphic: {
    width: 100,
    height: 100,
    marginLeft: -5,
  },
  link: {
    marginLeft: theme.spacing.unit / 2,
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
});
function AuthView(props) {
  const {
    onSignupRoute,
    isLoading,
    GTeventHandler,
    changeHandler,
    isLessThan840,
    classes,
    urlParams,
  } = props;

  let header = <Header greeting={onSignupRoute ? 'Sign Up' : 'Sign In'} />;
  if (isLessThan840 && onSignupRoute) {
    header = (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        style={{ height: 150 }}
      >
        <Grid item xs={3}>
          <img
            src={womanGraphic}
            className={classes.womanGraphic}
            alt="2hats"
          />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4" style={{ fontSize: 19, marginRight: -10 }}>
            The simplest way to get access to meaningful work experience
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      {header}

      <GoogleButton
        disabled={isLoading}
        key="google-button"
        id="google-button"
        GTevent={GTeventHandler}
        action={onSignupRoute ? 'Sign up' : 'Sign in'}
        changeHandler={changeHandler}
      />
      <LinkedinButton
        disabled={isLoading}
        key="linkedin-button"
        id="linkedin-button"
        action={onSignupRoute ? 'Sign up' : 'Sign in'}
        changeHandler={changeHandler}
      />

      <Typography variant="subtitle1" style={{ marginTop: 15 }}>
        OR
      </Typography>

      <EmailAuth changeHandler={changeHandler} urlParams={urlParams} />

      <div>
        <Typography
          variant="body2"
          style={{ display: 'inline', marginRight: 5 }}
        >
          {onSignupRoute
            ? 'Already have an account?'
            : 'Don’t have an account?'}
          <a
            className={classes.link}
            href={onSignupRoute ? routes.SIGN_IN : routes.SIGN_UP}
          >
            {onSignupRoute ? 'Sign in' : 'Sign up'}
          </a>
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(AuthView);
