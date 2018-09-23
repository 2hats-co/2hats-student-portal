import React from 'react';
import Typography from '@material-ui/core/Typography';

import * as routes from "../../constants/routes";

import Header from './Header';
import GoogleButton from './GoogleButton';
import LinkedinButton from './LinkedinButton';
import EmailAuth from './EmailAuth';
import StyledLink from '../StyledLink';

function AuthView(props) {
    const { onSignupRoute, isLoading, handleGTevent, changeHandler } = props;

    return(
    <React.Fragment>
        <Header greeting={ onSignupRoute ? 'Sign Up' : 'Sign In' } />

        <GoogleButton
            disabled={isLoading}
            key="google-button"
            id="google-button"
            GTevent={handleGTevent}
            action={ onSignupRoute ? 'Sign up' : 'Sign in' }
            changeHandler={changeHandler}
        />
        <LinkedinButton
            disabled={isLoading}
            key="linkedin-button"
            id="linkedin-button"
            action={ onSignupRoute ? 'Sign up' : 'Sign in' }
            changeHandler={changeHandler}
        />

        <Typography variant="subheading" style={{marginTop:15}}>OR</Typography>

        <EmailAuth changeHandler={changeHandler} />

        <div>
            <Typography variant="body1" style={{display:'inline', marginRight:5}}>
                { onSignupRoute ? 'Already have an account?' : 'Don’t have an account?' }
            </Typography>
            <StyledLink href={ onSignupRoute ? routes.SIGN_IN : routes.SIGN_UP }>
                { onSignupRoute ? 'Sign in' : 'Sign up' }
            </StyledLink>
        </div>
    </React.Fragment>
    );
}

export default AuthView;
