import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthenticationContainer from '../containers/AuthenticationContainer';
import { AUTHENTICATION_CONTAINER } from '../constants/views';

const Landing = props => {
  useEffect(() => {
    if (props.authUser) {
      props.history.push(routes.DASHBOARD);
    }
  }, []);

  return (
    <AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn} />
  );
};

export default withRouter(Landing);
