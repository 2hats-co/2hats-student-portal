import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthenticationContainer from '../containers/AuthenticationContainer';
import { AUTHENTICATION_CONTAINER } from '../constants/views';

/**
 * **Redirects** users to [`/dashboard`](#section-dashboard) or **renders**
 * [`AuthenticationContainer`](#authenticationcontainer).
 */
const Landing = ({ authUser, history }) => {
  useEffect(() => {
    if (authUser) {
      history.push(routes.DASHBOARD);
    }
  }, []);

  return (
    <AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn} />
  );
};

Landing.propTypes = {
  authUser: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withRouter(Landing);
