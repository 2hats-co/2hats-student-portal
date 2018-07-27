import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';

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
    marginLeft:50
    }
});
class DashboardContainer extends Component{
    componentDidMount(){
      //  window.Intercom('update')
    }
    renderApplicationProcess(profile){ 
        if(profile){
        const profileData=Object.values(profile)[0]
            if(profileData.hasSubmit){
                return<ApplicationTimeLine/>
            }else{
               return <div style={{marginBottom:40}}><ApplicationProgress data={profileData}/></div>
            }
        }
    }


    render(){
        const {classes,upcomingEvents,profile} = this.props
        return(
            <DashboardWrapper header='Dashboard'>
            <div className={classes.root}>
            {this.renderApplicationProcess(profile)}      
           <UpcomingEvents data={upcomingEvents}/>
           </div>
            </DashboardWrapper>
        )
    }

}

const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Connect get data from fire stroe
    connect(({ firestore }) => ({
        profile: firestore.data.profiles,
        user: firestore.data.users,
       upcomingEvents: firestore.data.upcomingEvents, // document data by id
    
    }))
  )
  export default enhance(
      withStyles(styles)(DashboardContainer)
  )