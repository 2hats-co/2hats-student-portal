import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ApplicationTimeLine from '../components/Dashboard/ApplicationTimeLine'
import ApplicationProgress from '../components/Dashboard/ApplicationProgress'
import FeedbackHistory from '../components/Dashboard/FeedbackHistory'
import UpcomingEvents from '../components/Dashboard/UpcomingEvents'
import Next from '../components/Dashboard/NextBanner'
import { compose } from 'redux';
import { withNavigation } from '../components/withNavigation';
import Grid from '@material-ui/core/Grid';
import {isComplete} from '../constants/signUpProcess'

const styles = theme => ({
    root: {
        width:'100%',
        paddingTop:30,
        flexWrap: 'nowrap',
        [theme.breakpoints.up('xs')]: {
            paddingLeft:30,
            paddingRight:30
        },[theme.breakpoints.up('sm')]: {
            paddingLeft:'calc(50% - 250px)'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft:100
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
        maxWidth:500,
        marginBottom:40
    }
});
class DashboardContainer extends Component{

    render(){
        const {classes,upcomingEvents,submissions, profile,user,handleInfoDialog} = this.props
        console.log(user.stage, user.status)
        const showProgress = (user.status === 'incomplete' || user.status=== 'complete')
        let banner = (<div/>)
        let timeLine = (<div/>)
        let progress = (<div/>)
       
        if(showProgress){
            progress = (<Grid item className={classes.item}>
                <ApplicationProgress data={profile} handleInfoDialog={handleInfoDialog}/>
                </Grid>)
                if(isComplete(profile)){
                    banner = <Next/>
                }
         
        }else{
            timeLine = (<ApplicationTimeLine user={user}/>)
        }

        return(
            <div>
            {timeLine}
            <Grid container direction='column' alignItems="flex-start" className={classes.root}>
                {progress}
                {banner} 
                {submissions&&submissions[0]&&<Grid item className={classes.item}><FeedbackHistory data={submissions}/></Grid> }
                <Grid item>
                    <UpcomingEvents data={upcomingEvents}/>
                </Grid>
           </Grid></div>
        )
    }
}
const enhance = compose(
    withNavigation,
  )
  export default enhance(
      withStyles(styles)(DashboardContainer)
  )
