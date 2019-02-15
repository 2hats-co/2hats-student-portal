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
      console.log(authUser);
      console.log(window.smartlook);

      window.smartlook('identify', authUser.uid, {
        name: authUser.displayName,
        email: authUser.email,
      });
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
