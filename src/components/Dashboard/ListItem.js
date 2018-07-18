import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import Grid  from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
     height:65,
     width:500
    },
    date:{
        height:65,
        width:65
    },
    content:{
        height:65,
        width:370
    },action:{
        height:65,
        width:65
    },
  });
function ListItem(props){
    const {classes,actionIcon} = props
   
    return(
    <Grid container direction='row' className={classes.root} alignItems='center'>
    <Grid container direction='column'className={classes.date} alignItems='center' justify='center'>
    <Typography variant='button'>
        JUN
    </Typography>
    <Typography variant='display1'>
         10
    </Typography>
    </Grid>
    <Grid container direction='column'className={classes.content} justify='center'>
    <Typography variant='title'>
        Event Name
    </Typography>
    <Typography variant='body1'>
         event location
    </Typography>
    </Grid>
    <Grid container className={classes.action} alignItems='center' justify='center' >
        {actionIcon}
    </Grid>
    </Grid>
   )
}

export default withStyles(styles)(ListItem);