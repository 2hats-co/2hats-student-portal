import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../../store';
import * as routes from '../../constants/routes';

const withAuthorisation = condition => Component => {
  function WithAuthorisation(props) {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      const { location, history } = props;

      auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          if (location.pathname) {
            history.push(
              `${routes.SIGN_IN}?route=${encodeURIComponent(
                location.pathname + location.search
              )}`
            );
            return;
          }
          history.push(routes.SIGN_IN);
        } else {
          setAuthUser(authUser);
          console.log(authUser);
        }
      });
    }, []);

    return props.authUser ? <Component {...props} /> : null;
  }
  return withRouter(WithAuthorisation);
};

export default withAuthorisation;
