import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem';
import CloudIcon from '@material-ui/icons/CloudDownload'
import { Divider } from '../../../node_modules/@material-ui/core';

const styles = theme => ({
    root: {
     width:500
    },
  });
function FeedbackHistory(props){
    const {classes} = props
   
    return(<div className={classes.root}><Typography variant='display1'>
   Feedback History
    </Typography>
    <Divider/>
    <ListItem actionIcon={<CloudIcon style={{fontSize:38}}/>}/>
    <Divider/>
   </div>)
}

export default withStyles(styles)(FeedbackHistory);