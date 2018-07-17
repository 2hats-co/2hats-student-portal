import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import EducationContainer from '../components/EduExp/EducationContainer';
import ProfileCard from '../components/ProfileCard';
import PropTypes from "prop-types";
import { height } from 'window-size';
const styles = theme => ({
    root: {
     width:'100%',

    }
});
class ProfileContainer extends Component{
    
    render(){
        const {classes} = this.props
        const steps =['Resume Submission','Online Interview','Assessment Centre','Job Placement']
        return(
           
            <DashboardWrapper header='Dashboard'>
            <Grid
            container
            spacing={16}
            className={classes.root}
            alignItems='center'
            direction='column'
          >
          <ProfileCard/>
            <EducationContainer industry={'IT'} name='education' width={650}/> 
            <EducationContainer industry={'IT'} name='experience' width={650}/>
            </Grid>
            </DashboardWrapper>
            

        )
    }

}
ProfileContainer.propTypes = {
    classes: PropTypes.object
  };
export default withStyles(styles)(ProfileContainer);
