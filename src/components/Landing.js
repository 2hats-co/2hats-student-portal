import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as routes from '../constants/routes'
import AuthenticationContainer from '../containers/AuthenticationContainer'
import { AUTHENTICATION_CONTAINER } from '../constants/views'

class Landing extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        if (this.props.authUser == ! null) {

                this.props.history.push(routes.DASHBOARD)
            
        }
    }
    componentDidMount() {
        if (this.props.authUser == ! null) {
                this.props.history.push(routes.DASHBOARD)
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authUser !== this.props.authUser) {
             this.props.history.push(routes.DASHBOARD) 
        }
    }
    render() {
        return (<AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn} />)
    }

}
function mapStateToProps(state) {
    return {
        authUser: state.sessionState.authUser,
    }
}
export default withRouter(connect(mapStateToProps)(Landing))