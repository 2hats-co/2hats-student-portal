import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress'

// Create HOC that gets firestore from react context and passes it as a prop
// NOTE: Modified version of withFirestore for a simple example. For a full
// application, use react-redux-firebase's withFirestore: https://goo.gl/4pxmPv
export const withFirestore = (WrappedComponent) => {
  class WithFirestore extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    }

    render() {
      let uid = 'maptest'
      let component = (<CircularProgress color="primary"  size={100} />)
       
      if(this.props.authUser){
        uid = this.props.authUser.uid
        component = (<WrappedComponent
        {...this.props}
        uid = {uid}
        dispatch={this.context.store.dispatch}
        firestore={this.context.store.firestore}
      />)
      }
      
      return (
        component
      )
    }
  }
  // Note, for full statics support, use hoist-non-react-statics as done
  // in react-redux-firebase's withFirestore: https://goo.gl/4pxmPv
  function mapStateToProps(state){
    return{
      authUser: state.sessionState.authUser
    }
  }
  return connect(mapStateToProps)(WithFirestore)
}
