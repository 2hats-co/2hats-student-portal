import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as routes from '../constants/routes'
import AuthenticationContainer from '../containers/AuthenticationContainer'
import { AUTHENTICATION_CONTAINER } from '../constants/views'

class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        if (this.props.authUser == ! null) {
            if (this.props.userProfileCreated) {
                this.props.history.push(routes.DASHBOARD)
            } else {
                this.props.history.push(routes.INTRODUCTION)
            }
        }
    }
    componentDidMount() {
        if (this.props.authUser == ! null) {
            if (this.props.userProfileCreated) {
                this.props.history.push(routes.DASHBOARD)
            } else {
                this.props.history.push(routes.INTRODUCTION)
            }
        }

    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.authUser)

        if (prevProps.authUser !== this.props.authUser) {
            console.log(this.props.authUser)

            if (this.props.authUser) {
                console.log(this.props.authUser)

                if (this.props.userProfileCreated) {
                    this.props.history.push(routes.DASHBOARD)
                } else {
                    this.props.history.push(routes.INTRODUCTION)
                }
            }
        }

    }
    render() {
        return (<AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn} />)
    }

}
function mapStateToProps(state) {
    return {
        authUser: state.sessionState.authUser,
        userProfileCreated: state.sessionState.userCompleteInitialSteps
    }
}
export default withRouter(connect(mapStateToProps)(Landing))