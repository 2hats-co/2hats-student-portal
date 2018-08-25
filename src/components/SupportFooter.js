import React from 'react'
import FooterImage from '../assets/images/graphics/Footer.svg'  
import Logo from '../assets/images/Logo/White2hats.svg'  
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';

function SupportFooter(props){
    window.Intercom('update',{
        'hide_default_launcher': true
      })
    return(
        <div style={{paddingBottom:50}}>
        <Grid container direction='row' justify='space-around' alignItems='flex-start' 
        style={{position:'relative',top:180,left:-16,right:0,backgroundColor:'#ff8a64',width:'calc(100% + 32px)',paddingBottom:30,paddingTop:50}}>
        <img style={{maxWidth:150}} src={Logo}/>
        <Grid container direction='row' alignItems='center' justify='center' style={{width:180, height:60}}>
        <Grid item xs={5}>
        <Typography variant='button' style={{color:'#fff'}} >
        Get help
        </Typography> </Grid>
        <Grid item xs={2}>
        <Typography variant='button' style={{color:'#fff'}} >
        |
        </Typography> </Grid>

        <Grid item xs={5}>
        <Typography variant='button' xs={6} style={{color:'#fff'}}>
        FAQ some
        </Typography> 
        </Grid>
        <Grid item xs={12}>
        <Typography  variant='caption' style={{color:'#fff',textAlign:'right', marginTop:10}}> 
        2hats 2018. All Rights Reserved.
        </Typography>
        </Grid>
        </Grid>
        </Grid>
        </div>
        )
}
export default SupportFooter