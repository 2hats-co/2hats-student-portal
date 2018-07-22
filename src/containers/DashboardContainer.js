import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import ApplicationTimeLine from '../components/Dashboard/ApplicationTimeLine'
import ApplicationProgress from '../components/Dashboard/ApplicationProgress'
import FeedbackHistory from '../components/Dashboard/FeedbackHistory'
import UpcomingEvents from '../components/Dashboard/UpcomingEvents'

import { compose } from 'redux';
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';

const styles = theme => ({
    root: {
     
    }
});
class DashboardContainer extends Component{
    
    render(){
        const {classes,upcomingEvents} = this.props
        return(
            <DashboardWrapper header='Dashboard'>
            <ApplicationProgress/>
           <FeedbackHistory/>
           <UpcomingEvents data={upcomingEvents}/>
            </DashboardWrapper>
        )
    }

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
      withStyles(styles)(DashboardContainer)
  )