import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../../store';
import * as routes from '../../constants/routes';

const withAuthorisation = condition => Component => {
  class WithAuthorisation extends React.Component {
    componentDidMount() {
      const { location, history } = this.props;

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

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorisation);
};

export default withAuthorisation;
