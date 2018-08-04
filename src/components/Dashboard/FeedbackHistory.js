import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem';
import LinkIcon from '@material-ui/icons/KeyboardArrowRight'
import { Divider } from '../../../node_modules/@material-ui/core';
import { now } from '../../../node_modules/moment';

const styles = theme => ({
    root: {
     width:500
    },
  });
function FeedbackHistory(props){
    const {classes,data} = props
  let items=[]
   console.log('feed',data)
   if(data){
   items= data.map(x=>{
     console.log(x)
      return({title:`Resume Submission (${x.submissionContent.process})`,body:'Under Review',timestamp:x.createdAt,key:x.id})
   })
   }
   console.log('feed1',items)
   
     
    return(<div className={classes.root}><Typography variant='display1'>
   Feedback History
    </Typography>
    <Divider/>
    {items.map(x=>
      <div>
       <ListItem 
       key={x.key}
       title={x.title}
       body={x.body}
       timestamp={x.timestamp}
       actionIcon={<LinkIcon 
       style={{fontSize:38}}/>}
       link={`prevSubmission?${x.key}`}
       />
       <Divider/>
      </div>
    )}
   
   </div>)
}

export default withStyles(styles)(FeedbackHistory);