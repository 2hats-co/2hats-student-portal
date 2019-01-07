import React from 'react';
import Button from 'sp2-material-ui/core/Button';
import Typography from 'sp2-material-ui/core/Typography';

import * as routes from "../../constants/routes";

import ChangeAdapter from "../InputFields/ChangeAdapter";
import Password from "../InputFields/Password";

import Header from './Header';

function ResetPasswordView(props) {
    const { firstName, changeHandler, password, passwordAction, isLoading } = props;

    return(
    <React.Fragment>

        <Header greeting="Hello" name={firstName} />
        <Typography variant="subheading">
            Please type a new password below.
        </Typography>

        <div style={{marginTop:10, width:'100%'}}>
            <ChangeAdapter changeHandler={changeHandler}>
                <Password primaryAction={passwordAction} password={password}
                label="New Password" />
            </ChangeAdapter>
        </div>

        <Button disabled={isLoading}
            style={{width:180, marginTop:40}}
            onClick={() => { passwordAction(routes.DASHBOARD) }}
        >
            Update password
        </Button>

    </React.Fragment>
    );
}

export default ResetPasswordView;
