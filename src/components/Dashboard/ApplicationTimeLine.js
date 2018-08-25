import React from 'react';
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import { withStyles } from "@material-ui/core/styles";

const STAGES = ['pre-review','resume','interview','assessment','placed']

  const styles = theme => ({
    root: {

    },
    label:{
      fontSize: '13px !important'
    }
   });
function ApplicationTimeLine(props){
    const {classes,theme,user} = props
    const currentStage = user.stage
    const currentStatus = user.status
    let activeStep = STAGES.indexOf(currentStage)
    if (currentStatus==='rejected'){
      activeStep = activeStep -1
    }
    const steps =['Resume Submission','Online Interview','Assessment Centre','Job Placement']

    return(<div><Typography variant='display1'>
    Application Timeline
    </Typography>
    <Stepper
      orientation={theme.responsive.isMobile?"vertical":"horizontal"}
      className={classes.stepper}
      activeStep={activeStep}
      alternativeLabel={!theme.responsive.isMobile}
    >
      {steps.map(label => {
        return (
          <Step key={label}>
            <StepLabel className={classes.label}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper></div>)
}
export default withStyles(styles,{ withTheme: true })(ApplicationTimeLine);