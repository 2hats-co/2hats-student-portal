import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store';
import LoadingScreen from '../../components/LoadingScreen';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loading: true };
    }

    componentDidMount() {
      const { onSetAuthUser } = this.props;
      auth.onAuthStateChanged(authUser => {
        if (this.state.loading) this.setState({ loading: false });

        if (authUser) this.setUser(authUser);
        else onSetAuthUser(null);
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
      if (this.state.loading) return <LoadingScreen />;
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
