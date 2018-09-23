import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
       width:100,
       height:20,
        backgroundColor:'#fff'
    },
    current:{
        width:10,
        height:10,
        backgroundColor:theme.palette.primary.light,
        borderRadius:5
    },
    other:{
        width:10,
        height:10,
        backgroundColor:'#e8e8e8',
        borderRadius:5
    }
      
  });
function StepsIndecator(props){
    const {classes,index} = props
    return(
        <Grid container direction='row' className={classes.root} justify='space-around'>
            
            <div className={index===0?classes.current:classes.other}/>
            <div className={index===1?classes.current:classes.other}/>
            <div className={index===2?classes.current:classes.other}/>
  

        </Grid>
    )
}
export default  withStyles(styles)(StepsIndecator)