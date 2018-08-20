import React from 'react';
import {withRouter} from 'react-router-dom';
import { auth, functions } from '../store';
import { CREATE_PASSWORD } from '../constants/routes';

class SmartLinkContainer extends React.Component {

    componentWillMount() {
        const queryStr = this.props.history.location.search;

        if(queryStr) {
            const slKeyName = "?slKey=";
            
            if(queryStr.indexOf(slKeyName)!== -1) {
                const slKeyVal = queryStr.slice(slKeyName.length, queryStr.length);

                if(slKeyVal !== "") {
                    this.setState({ slKey: slKeyVal });
                }
            }
        }
    }
    
    render() {
        const { slKey } = this.state;
        const restApiSmartLink = functions.httpsCallable('restApiSmartLink');

        restApiSmartLink({ slKey: slKey }).then(async (result) => {
            // Sign in user with custom token.
            const authUser = await auth.signInWithCustomToken(result.data.token);
            
            const route = result.data.route
            if(result.data.route === CREATE_PASSWORD){
                const firstName = authUser.user.displayName.split(' ')[[0]]
                this.props.history.replace(route+`?firstName=${firstName}`);
            }else{
                this.props.history.replace(route);
            }
           
        }).catch((error) => {
            // Getting the Error details.
            console.log("Call restApiSmartLink error: ", error);
        });

        // Could be a loading view.
        return (null);
    }
}

export default withRouter(SmartLinkContainer);