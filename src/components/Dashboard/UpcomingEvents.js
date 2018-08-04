import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem'
import LinkIcon from '@material-ui/icons/KeyboardArrowRight'
import Divider from '@material-ui/core/Divider'
import * as _ from 'lodash'
const styles = theme => ({
    root: {
      width:'100%',
      maxWidth:500
    },
    title:{
      marginBottom:15
    }
  });

function UpcomingEvents(props){
  let items = []
    const {classes,data} = props
    const orderedData = _.sortBy(data,['startDate'])
    _.forEach(orderedData,(event,key)=>{
    
      const timestamp = event.startDate
    
      const title = event.name
      const body = event.location
      const link = event.url
     items.push({key,timestamp,title,body,link})
    })
    return(<div className={classes.root}><Typography className={classes.title} variant='display1'>
     Upcoming Events
    </Typography>
    <Divider/>
    {items.map(x=> (<div key={x.key}><ListItem title={x.title} timestamp={x.timestamp} body={x.body} link={x.link} actionIcon={<LinkIcon style={{fontSize:38}}/>}/><Divider/></div>)
    )}
  
    
    <Divider/>
   </div>)
}

export default withStyles(styles)(UpcomingEvents)



