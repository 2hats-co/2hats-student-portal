import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem';
import LinkIcon from '@material-ui/icons/KeyboardArrowRight'
import { Divider } from '../../../node_modules/@material-ui/core';
import * as _ from 'lodash'

const styles = theme => ({
    root: {
      width:'100%',
      maxWidth:500
    },
  });
function FeedbackHistory(props){
    const {classes,data} = props
  let items=[]
   console.log('feed',data)
   if(data){
   items= data.map(x=>{
     console.log(x)
     // (${x.submissionContent.process})
      return({title:`Resume Submission`,body:'Under Review',timestamp:x.createdAt,key:x.id})
   })
   items = _.orderBy(items, 'timestamp','asc')
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