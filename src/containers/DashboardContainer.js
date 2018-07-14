import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
const styles = theme => ({
    root: {
     
    }
});
class DashboardContainer extends Component{
    
    render(){
        const {classes} = this.props
        const steps =['Resume Submission','Online Interview','Assessment Centre','Job Placement']
        return(
            <DashboardWrapper header='Dashboard'>
            <Typography variant='display1'>
            Application Timeline
            <Stepper
              className={classes.stepper}
              activeStep={0}
              alternativeLabel
            >
              {steps.map(label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            </Typography>
            </DashboardWrapper>
        )
    }

}

export default withStyles(styles)(DashboardContainer);
