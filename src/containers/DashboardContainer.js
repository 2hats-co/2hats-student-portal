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
    width:'100%',
    paddingTop:30,
    maxWidth:700,
    [theme.breakpoints.up('xs')]: {
        paddingLeft:30,
        paddingRight:30
      },[theme.breakpoints.up('sm')]: {
        paddingLeft:'calc(50% - 250px)'
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft:60
    }
    },
    navIconHide:{},
    appBar:{},
    toolbar:{},
    drawerPaper:{},
    content:{},
    logo:{},
    greeting:{},
    item:{
        width:'100%',
      maxWidth:500


    }
   
});
class DashboardContainer extends Component{
    renderApplicationProcess(profile, user,handleInfoDialog){ 
        if(profile){
            if(profile.hasSubmit){
                return<ApplicationTimeLine user={user}/>
            }else{
               return <div style={{marginBottom:40}}><ApplicationProgress data={profile} handleInfoDialog={handleInfoDialog}/></div>
            }
        }
    }
    render(){
        const {classes,upcomingEvents,submissions, profile,user,handleInfoDialog} = this.props
        return(
            <Grid container direction='row' alignItems="center" className={classes.root}>
            <Grid item className={classes.item}>
            {this.renderApplicationProcess(profile,user, handleInfoDialog)}  
            </Grid>
            <Grid item className={classes.item}>            
        {submissions&&submissions[0]&&<FeedbackHistory data={submissions}/> }  
           </Grid>
            <Grid item >    
           <UpcomingEvents data={upcomingEvents}/>
           </Grid>
           </Grid>
        )
    }
}
const enhance = compose(
    withNavigation,
  )
  export default enhance(
      withStyles(styles)(DashboardContainer)
  )