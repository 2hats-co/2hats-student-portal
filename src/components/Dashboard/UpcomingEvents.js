import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem'
import LinkIcon from '@material-ui/icons/KeyboardArrowRight'
import Divider from '@material-ui/core/Divider'
const styles = theme => ({
    root: {
     width:500,
    },
  });
function UpcomingEvents(props){
    const {classes} = props
   
    return(<div className={classes.root}><Typography variant='display1'>
     Upcoming Events
    </Typography>
    <Divider/>
    <ListItem actionIcon={<LinkIcon style={{fontSize:38}}/>}/>
    <Divider/>
   </div>)
}

export default withStyles(styles)(UpcomingEvents);