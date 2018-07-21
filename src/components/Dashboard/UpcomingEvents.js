import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import ListItem from './ListItem'
import LinkIcon from '@material-ui/icons/KeyboardArrowRight'
import Divider from '@material-ui/core/Divider'
import { compose } from 'redux';
import { connect } from 'react-redux';
import  {withFirestore} from '../../utilities/withFirestore';
import * as _ from 'lodash'
const styles = theme => ({
    root: {
     width:500,
    },
  });

function getTimeStampData(timestamp){
  const time = new Date(timestamp.seconds*1000)
  const date = time.getDate()
  const month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][time.getMonth()]
  const hour = time.getHours()
  const minutes = time.getMinutes()
 return {date,month,hour,minutes}
}
function UpcomingEvents(props){
    const {classes,upcomingEvents} = props
    _.forEach(upcomingEvents,event=>{
     
      console.log('upcomingEvents',getTimeStampData(event.startDate))
    })
    
    return(<div className={classes.root}><Typography variant='display1'>
     Upcoming Events
    </Typography>
    <Divider/>
    <ListItem actionIcon={<LinkIcon style={{fontSize:38}}/>}/>
    <Divider/>
   </div>)
}


const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Connect get data from fire stroe
  connect(({ firestore }) => ({
     upcomingEvents: firestore.data.upcomingEvents, // document data by id
  
  }))
)
export default enhance(
    withStyles(styles)(UpcomingEvents)
)


