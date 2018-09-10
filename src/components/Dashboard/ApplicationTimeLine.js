import React from 'react';
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import { withStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

const STAGES = ['pre-review','resume','interview','assessment','placed']

  const styles = theme => ({
    root: {
      width:'90%',
      paddingTop: 30,
      [theme.breakpoints.up('xs')]: {
          paddingLeft: 30
      },
      [theme.breakpoints.up('sm')]: {
          paddingLeft: 'calc(50% - 250px)'
      },
      [theme.breakpoints.up('md')]: {
          paddingLeft: 100
      },
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
    let negativeStatuses = ['rejected','lost','conditional','interview','offer']
    if (negativeStatuses.includes(currentStatus)){
      activeStep = activeStep -1
    }
    const steps =['Resume Submission','Online Interview','Assessment Centre','Job Placement']

    return(<Grid className={classes.root} container direction='column' alignItems='flex-start' justify='flex-start'>
    <Grid item>
      <Typography variant='display1' className={classes.title}>
      Application Timeline
      </Typography>
    </Grid>
    <Grid item style={{width:'100%'}}>
      <Stepper
        orientation={theme.responsive.isMobile?"vertical":"horizontal"}
        className={theme.responsive.isMobile ? classes.stepperMobile : classes.stepper}
        activeStep={activeStep}
        alternativeLabel={!theme.responsive.isMobile}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel className={classes.label}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Grid>
   
    </Grid>)
}
export default withStyles(styles,{ withTheme: true })(ApplicationTimeLine);
