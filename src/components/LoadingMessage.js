import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid,Typography } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
   root:{
       marginTop:'20%'
   
   }
  });
function LoadingMessage(props){

    const {classes,message} = props 

    return(
        <Grid container 
        className ={classes.root}
        direction='column'
        alignItems='center'
        >
        <Typography variant='headline'>
       {message?message:'Your Future Starts Soon…'} 
        </Typography>
        <CircularProgress color="primary"  size={60} />
        </Grid>
    )

}
export default withStyles(styles)(LoadingMessage)