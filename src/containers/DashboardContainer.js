import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import ApplicationTimeLine from '../components/Dashboard/ApplicationTimeLine'
import ApplicationProgress from '../components/Dashboard/ApplicationProgress'
import FeedbackHistory from '../components/Dashboard/FeedbackHistory'
import UpcomingEvents from '../components/Dashboard/UpcomingEvents'
const styles = theme => ({
    root: {
     
    }
});
class DashboardContainer extends Component{
    
    render(){
        const {classes} = this.props
       
        return(
            <DashboardWrapper header='Dashboard'>
            <ApplicationProgress/>
           <FeedbackHistory/>
           <UpcomingEvents/>
            </DashboardWrapper>
        )
    }

}

export default withStyles(styles)(DashboardContainer);
