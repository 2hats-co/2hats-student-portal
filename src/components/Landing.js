import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as routes from '../constants/routes'
import AuthenticationContainer from '../containers/AuthenticationContainer'
import {AUTHENTICATION_CONTAINER} from '../constants/views'

class Landing extends React.Component{
    constructor(props){
        super(props)
        this.state={


        }
    }
    componentWillMount(){
        console.log(this.props.authUser)
        if(this.props.authUser ==! null){
            this.props.history.push(routes.DASHBOARD)
        }
    }
    componentDidMount(){
        console.log(this.props.authUser)

        if(this.props.authUser ==! null){
            this.props.history.push(routes.DASHBOARD)
        }

    }
    componentDidUpdate(prevProps,prevState){
        console.log(this.props.authUser)

        if(prevProps.authUser !== this.props.authUser){
            console.log(this.props.authUser)
       
        if(this.props.authUser){
        console.log(this.props.authUser)

            this.props.history.push(routes.DASHBOARD)
        }
        }

    }
    render(){
        return(<AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn}/>)
    }

}
function mapStateToProps(state) {
    return{
        authUser: state.sessionState.authUser
      }
  }
  export default withRouter(connect(mapStateToProps)(Landing))