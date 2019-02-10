import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../../store';
import * as routes from '../../constants/routes';

const withAuthorisation = condition => Component => {
  class WithAuthorisation extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return WithAuthorisation;
};

export default withAuthorisation;
