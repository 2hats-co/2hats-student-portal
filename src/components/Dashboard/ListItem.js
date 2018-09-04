import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import Grid  from "@material-ui/core/Grid";
import IconButton  from "@material-ui/core/IconButton";

const styles = theme => ({
    root: {
        cursor:'pointer',
        paddingTop:5,
        paddingBottom:5,
//   height:65,
     width:'100%',
 
    },
    date:{
        height:65,
        width:65
    },
    content:{
        //height:65,
        width:`calc(100% - 65px)`,
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
    },button:{
        marginTop:10,
        marginLeft:20
    },description:{
        overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
    }
  });
  function getTimeStampData(timestamp){
    const time = new Date(timestamp.seconds*1000)
    let date = time.getDate()
    if (date<10){
        date=`0${date}`
    }
    const month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][time.getMonth()]
    const hour = time.getHours()
    const minutes = time.getMinutes()
   return {date,month,hour,minutes}
  }
function ListItem(props){
    const {classes,actionIcon,timestamp,title,body,link,theme} = props
    const {isMobile} = theme.responsive
    const date = getTimeStampData(timestamp).date
    const month = getTimeStampData(timestamp).month
    return(
    <Grid container
    onClick={()=>{ window.open(link, '_blank');}}
    direction='row' 
    className={classes.root} 
    alignItems='center' 
    justify='space-between'>
        <Grid item className={classes.content}>
            <Grid container direction='row'className={classes.root} alignItems='center' justify='flex-start'>
                <Grid container direction='column'className={classes.date} alignItems='center' justify='center'>
                    <Typography variant='button'>
                        {month}
                    </Typography>
                    <Typography variant='display1'>
                        {date}
                    </Typography>
                </Grid>
                <Grid container style={{width:'calc(100% - 65px)'}} direction='column' justify='center'>
                    <Typography variant={'title'}>
                        {title}
                    </Typography>
                    <Typography variant='body1' className={classes.description}>
                        {body}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item className={classes.action} 
        //alignItems='center' justify='center' 
        >
            <IconButton className={classes.button} component="span"><a className={classes.link} href={link} target="_blank">
                {actionIcon}</a>
            </IconButton>
        </Grid>
    </Grid>
   )
}

export default withStyles(styles,{withTheme:true})(ListItem);