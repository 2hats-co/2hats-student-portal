import React from 'react'
import { Typography,Grid,Card,Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import StyledLink from './StyledLink'
const drawerWidth = 240;
const styles = theme => ({
    root:{},prompt:{
        [theme.breakpoints.up('xs')]: {
            textAlign:'center'
          },
        [theme.breakpoints.up('md')]: {
            textAlign:'left'
        },
    },
    grid:{
        padding:20,
      },
      actionGrid:{
        minWidth:375,
        maxWidth:400
      },
      link:{
        fontSize:'15px',
        fontWeight:'bold',
        textAlign:'center',
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer'
        },
        
        
      }
  });
function StatusCard(props){
    const {prompt,classes ,theme} = props
    const {message,buttons,link} = prompt
    console.log(props)
    return(
        <Card className={classes.root}>
            <Grid container className={classes.grid} direction='row' alignItems='center' justify='space-around'> 
                <Grid  xs={12} sm={6} item><Typography className={classes.prompt} variant='subheading'>
                  {message}
                </Typography>
                </Grid>
                {
                <Grid item xs={12} sm={6}>
                <Grid container  direction='row' alignItems='center' justify='flex-end'>
                {buttons&&
                    buttons.map(x=>{return(
                        <Grid item xs={6} sm={4}>
                        <Button onClick={x.action} style={{maxHeight:35,minWidth:150}} variant='flat'>
                        {x.label}
                        </Button>
                        </Grid>
                    )
                })
                }
                {
                 (link && !theme.responsive.isMobile)&&  <Grid item xs={1} sm={1}> <Typography variant='Button' style={{textAlign:'left'}}>OR</Typography> </Grid>
                }
                 {link&&
                  <Grid item xs={6} sm={6}>
                    <a className={classes.link} onClick={()=>{link.action()}}>
                    {link.label}
                    </a> 
                    </Grid>
                }
                </Grid>
                </Grid>
                }
            </Grid>
        </Card>
    )
}
export default withStyles(styles,{ withTheme: true })(StatusCard)