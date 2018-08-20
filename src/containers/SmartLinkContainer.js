import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import { auth, functions } from '../store';

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

        restApiSmartLink({ slKey: slKey }).then((result) => {
            // Sign in user with custom token.
            auth.signInWithCustomToken(result.data.token);

            // Redirect to create password page.
            this.props.history.replace(result.data.route);
        }).catch((error) => {
            // Getting the Error details.
            console.log("Call restApiSmartLink error: ", error);
        });

        // Could be a loading view.
        return (null);
    }
}

export default withRouter(SmartLinkContainer);