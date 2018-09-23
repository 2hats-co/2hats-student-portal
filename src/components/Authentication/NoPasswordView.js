import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';
import {PRIMARY_COLOR} from '../../Theme'

import BackBar from './BackBar';
import GreetingWithFirstName from './GreetingWithFirstName';

class NoPasswordView extends React.Component{
    constructor(){
        super()
        this.resendEmail = this.resendEmail.bind(this)
    }
    resendEmail(){
        const {email,changeHandler} = this.props
        const request = {email:email}
        cloudFunction(CLOUD_FUNCTIONS.CREATE_PASSWORD,request,changeHandler('snackBar',{variant:'success',message:'We will resend you the email shortly'}),(e)=>{changeHandler('snackBar',{variant:'error',message:'An error has occured please try agian soon'});console.log(e)})
    }
    render(){
        const { isLoading, email, backHandler, firstName } = this.props;

        return(
        <React.Fragment>
            <BackBar isLoading={isLoading} email={email} backHandler={backHandler} />
            <GreetingWithFirstName greeting="Welcome back" firstName={firstName} />
            <Grid container style={{height:105}} direction='column' justify='space-between'>
                <Typography variant='body1'>
                We’ve sent you a confirmation email, please check your mailbox.
                </Typography>

                <Typography variant='body1'>
                Didn’t receive the email? You can request a resend&nbsp;
                <a onClick={this.resendEmail} style={{color:PRIMARY_COLOR, cursor:'pointer',textDecoration:'underline'}}>here</a>.
                Don’t forget to check your junk or spam folder.
                </Typography>
            </Grid>
        </React.Fragment>
        )
    }
}

export default NoPasswordView;
