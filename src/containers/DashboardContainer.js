import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ApplicationTimeLine from '../components/Dashboard/ApplicationTimeLine'
import ApplicationProgress from '../components/Dashboard/ApplicationProgress'
import FeedbackHistory from '../components/Dashboard/FeedbackHistory'
import UpcomingEvents from '../components/Dashboard/UpcomingEvents'
import { compose } from 'redux';
import { withNavigation } from '../components/withNavigation';
import { Grid } from '../../node_modules/@material-ui/core';

const styles = theme => ({
    root: {
    width:'100%'
    }
});
class DashboardContainer extends Component{
    
    renderApplicationProcess(profile){ 
        if(profile){

            if(profile.hasSubmit){
                return<ApplicationTimeLine/>
            }else{
               return <div style={{marginBottom:40}}><ApplicationProgress data={profile}/></div>
            }
        }
    }
    render(){
        const {classes,upcomingEvents,profile} = this.props
        return(
            <Grid container direction='column' className={classes.root}>
            {this.renderApplicationProcess(profile)}      
           <UpcomingEvents data={upcomingEvents}/>
           </Grid>
        )
    }

}

const enhance = compose(
    // add redux store (from react context) as a prop
    withNavigation,
    // Connect get data from fire stroe
  )
  export default enhance(
      withStyles(styles)(DashboardContainer)
  )