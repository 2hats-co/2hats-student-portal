import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;
      auth.onAuthStateChanged(authUser => {
        authUser ? this.setUser(authUser) : onSetAuthUser(null);
      });
    }
    setUser(authUser) {
      const { onSetAuthUser } = this.props;
      onSetAuthUser(authUser);
      // let user = {
      //   app_id: 'k8mrtb3h',
      //   name: authUser.displayName, // Full name
      //   email: authUser.email, // Email address
      //   user_id: authUser.uid,
      //   created_at: authUser.metadata.creationTime, // Signup Date
      // };
      // window.intercomSettings = user;
    }
    render() {
      return <Component />;
    }
  }
  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });
  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};

export default withAuthentication;
