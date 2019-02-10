import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthenticationContainer from '../containers/AuthenticationContainer';
import { AUTHENTICATION_CONTAINER } from '../constants/views';

class Landing extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.authUser === !null) {
      this.props.history.push(routes.DASHBOARD);
    }
  }
  componentDidMount() {
    if (this.props.authUser === !null) {
      this.props.history.push(routes.DASHBOARD);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authUser !== this.props.authUser) {
      this.props.history.push(routes.DASHBOARD);
    }
  }
  render() {
    return (
      <AuthenticationContainer
        isPublic
        view={AUTHENTICATION_CONTAINER.signIn}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser,
  };
}
export default withRouter(Landing);
