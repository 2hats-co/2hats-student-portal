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
                style={{width:'85%',paddingBottom:30,paddingTop:0,margin:'calc(-4vw + 20px) auto 0'}}>
                    <img style={{maxWidth:150, width:'25vw'}} src={Logo}/>

                    <Grid container direction='row' alignItems='center' justify='flex-end' style={{width:190, height:60}}>
                        <Grid item xs={12} style={{textAlign: 'right'}}>
                            <a href='https://intercom.help/2hats/faq' style={{textDecoration:'none'}} target='_blank'>
                                <Typography variant='button' style={{color:'#fff', display:'inline'}} >
                                    Help Center
                                </Typography>
                            </a>
                            <Typography variant='button' style={{color:'#fff',margin:'0 10px', display:'inline'}} >
                                |
                            </Typography>
                            <Typography onClick={()=>{window.Intercom('show')}} variant='button' style={{color:'#fff',cursor:'pointer', display:'inline'}}>
                                Live Chat
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography  variant='caption' style={{color:'#fff',textAlign:'right', marginTop:10}}> 
                            &copy;&nbsp;2hats&nbsp;{new Date().getFullYear()}. All&nbsp;rights&nbsp;reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        )
}
export default SupportFooter
