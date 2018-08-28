import React from 'react'
import FooterImage from '../assets/images/graphics/Footer.svg'  
import Logo from '../assets/images/Logo/White2hats.svg'  
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';
import Footer from '../assets/images/graphics/Footer.svg';
import FooterMobile from '../assets/images/graphics/FooterMobile.svg';

function SupportFooter(props){
    window.Intercom('update',{
        'hide_default_launcher': true
      });
    
    const FooterStyle = props.mobile ? {
        padding:'7.5%',
        backgroundImage:`url(${FooterMobile})`
    } : {
        padding:'4.37%',
        backgroundImage:`url(${Footer})`
    };

    return(
        <Grid container direction='column' justify='flex-end' alignItems='center'
        style={{position:'absolute',bottom:0}}>
            <Grid item style={{
                width:'100%',fontSize:0,height:0,backgroundSize:'103% 103%',
                backgroundRepeat:'no-repeat', backgroundPosition: 'top center',
                ...FooterStyle}}>
            </Grid>
            <Grid item style={{backgroundColor:'#ef5b34',width:'100%'}}>
                <Grid container direction='row' justify='space-between' alignItems='flex-start' 
                style={{width:'85%',paddingBottom:30,paddingTop:0,margin:'0 auto'}}>
                    <img style={{maxWidth:150}} src={Logo}/>

                    <Grid container direction='row' alignItems='center' justify='center' style={{width:200, height:60}}>
                        <Grid item xs={6}>
                            <a href='https://intercom.help/2hats/faq' style={{textDecoration:'none'}} target='_blank'><Typography variant='button' style={{color:'#fff'}} >
                            Help Center
                            </Typography></a>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant='button' style={{color:'#fff'}} >
                            |
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography onClick={()=>{window.Intercom('show')}} variant='button' xs={6} style={{color:'#fff',cursor:'pointer'}}>
                            Live Chat
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography  variant='caption' style={{color:'#fff',textAlign:'right', marginTop:10}}> 
                            2hats 2018. All Rights Reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        )
}
export default SupportFooter
