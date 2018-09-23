import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';
import {PRIMARY_COLOR} from '../../Theme'
class NoPassword extends React.Component{
    constructor(){
        super()
        this.resendEmail = this.resendEmail.bind(this)
    }
    resendEmail(){
        const {email,changeHandler} = this.props
        const request = {email:email}
        cloudFunction(CLOUD_FUNCTIONS.CREATE_PASSWORD,request,changeHandler('snackBar',{variant:'success',message:'A confirmation email is sent to you.'}),(e)=>{changeHandler('snackBar',{variant:'error',message:'An error has occured please try agian soon'});console.log(e)})
    }
    render(){
        return(
        <Grid container style={{height:105}} direction='column' justify='space-between'>
            <Typography variant='body1'>
               We've sent you a confirmation email, please check your mailbox.
             </Typography>

            <Typography variant='body1'>
            Didn't receive the email? You can request a resend <a onClick={this.resendEmail} style={{color:PRIMARY_COLOR, cursor:'pointer',textDecoration:'underline'}}>here</a>. Don't forget to check the junk mailbox.
             </Typography>
        </Grid>
        )    
    }
}
export default NoPassword
