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
    widthMax:700,
    [theme.breakpoints.up('xs')]: {
        paddingLeft:30,
        paddingRight:30

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
        const {classes,upcomingEvents,submissions, profile} = this.props
        return(
            <Grid container direction='row' className={classes.root}>
            <Grid item xs={12} >
            {this.renderApplicationProcess(profile)}  
            </Grid>
            <Grid item  xs={12}>            
        {submissions&&submissions[0]&&<FeedbackHistory data={submissions}/> }  
           </Grid>
            <Grid item  xs={12}>    
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