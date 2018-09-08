import React from 'react';
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import { withStyles } from "@material-ui/core/styles";

const STAGES = ['pre-review','resume','interview','assessment','placed']

  const styles = theme => ({
    root: {
      paddingTop: 30,
      paddingLeft: 30,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
      },
    },
    title: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 'calc(50% - 250px)'
      },
      [theme.breakpoints.up('md')]: {
          paddingLeft: 100
      },
    },
    label:{
      fontSize: '13px !important'
    },stepper:{
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 'calc(50% - 250px)'
      },
      [theme.breakpoints.up('md')]: {
          paddingLeft: 70
      },
    },
    stepperMobile: {
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 'calc(50% - 250px)',
      },
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

    return(<div className={classes.root}><Typography variant='display1' className={classes.title}>
    Application Timeline
    </Typography>
    <Stepper
      orientation={theme.responsive.isMobile?"vertical":"horizontal"}
      className={theme.responsive.isMobile ? classes.stepperMobile : classes.stepper}
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
