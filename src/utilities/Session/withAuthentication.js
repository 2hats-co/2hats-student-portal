import React from 'react';
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
  return WithAuthentication;
};

export default withAuthentication;
