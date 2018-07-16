import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import ApplicationTimeLine from '../components/DashboardComponents/ApplicationTimeLine'
import FeedbackHistory from '../components/DashboardComponents/FeedbackHistory'
import UpcomingEvents from '../components/DashboardComponents/UpcomingEvents'
const styles = theme => ({
    root: {
     
    }
});
class DashboardContainer extends Component{
    
    render(){
        const {classes} = this.props
       
        return(
            <DashboardWrapper header='Dashboard'>
            <ApplicationTimeLine/>
           <FeedbackHistory/>
           <UpcomingEvents/>
            </DashboardWrapper>
        )
    }

}

export default withStyles(styles)(DashboardContainer);
