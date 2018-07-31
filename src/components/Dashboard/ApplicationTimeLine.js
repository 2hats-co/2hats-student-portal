import React from 'react';
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
     
    },
  });
function ApplicationTimeLine(props){
    const {classes,theme} = props
    const steps =['Resume Submission','Online Interview','Assessment Centre','Job Placement']
    return(<div><Typography variant='display1'>
    Application Timeline
    </Typography>
    <Stepper
      orientation={theme.responsive.isMobile?"vertical":"horizontal"}
      className={classes.stepper}
      activeStep={0}
      alternativeLabel={!theme.responsive.isMobile}
    >
      {steps.map(label => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper></div>)
}
export default withStyles(styles,{ withTheme: true })(ApplicationTimeLine);