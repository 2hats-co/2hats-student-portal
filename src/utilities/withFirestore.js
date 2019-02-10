import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Create HOC that gets firestore from react context and passes it as a prop
// NOTE: Modified version of withFirestore for a simple example. For a full
// application, use react-redux-firebase's withFirestore: https://goo.gl/4pxmPv
export const withFirestore = WrappedComponent => {
  class WithFirestore extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    render() {
      let uid = 'maptest';
      let component = <div />;
      let auth = this.props.authUser;
      if (auth) {
        uid = auth.uid;
        component = (
          <WrappedComponent
            {...this.props}
            uid={uid}
            auth={this.props.authUser}
            dispatch={this.context.store.dispatch}
            firestore={this.context.store.firestore}
          />
        );
      } else {
        component = (
          <WrappedComponent
            {...this.props}
            dispatch={this.context.store.dispatch}
            firestore={this.context.store.firestore}
          />
        );
      }

      return component;
    }
  }
  return WithFirestore;
};
