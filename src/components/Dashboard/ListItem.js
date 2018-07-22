import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import Grid  from "@material-ui/core/Grid";
import IconButton  from "@material-ui/core/IconButton";

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
    link:{
        color:'#000',
        'a:link':{color:'#000'},
        'a:visited':{color:'#000'},
        'a:hover':{color:'#000'},
        'a:active':{color:'#000'}
    }
  });
function ListItem(props){
    const {classes,actionIcon,month,date,title,body,link} = props
     console.log(link)
    return(
    <Grid container direction='row' className={classes.root} alignItems='center'>
    <Grid container direction='column'className={classes.date} alignItems='center' justify='center'>
    <Typography variant='button'>
        {month}
    </Typography>
    <Typography variant='display1'>
        {date}
    </Typography>
    </Grid>
    <Grid container direction='column'className={classes.content} justify='center'>
    <Typography variant='title'>
        {title}
    </Typography>
    <Typography variant='body1'>
         {body}
    </Typography>
    </Grid>
    <Grid container className={classes.action} alignItems='center' justify='center' >
    <IconButton className={classes.button} component="span"><a className={classes.link} href={link} target="_blank">
             {actionIcon}</a>
        </IconButton>
        
    </Grid>
    </Grid>
   )
}

export default withStyles(styles)(ListItem);