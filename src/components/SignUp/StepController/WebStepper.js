import React from 'react'
import withStyles from "sp2-material-ui/core/styles/withStyles";
import Stepper from "sp2-material-ui/core/Stepper";
import Step from "sp2-material-ui/core/Step";
import StepLabel from "sp2-material-ui/core/StepLabel";

const styles = theme => ({
  stepper:{
   // paddingTop:0,
    padding:0,
    //margin:'auto',
    marginLeft:-20,
    paddingBottom:30,
    width:'calc(100% + 40px)',
    //widthMax:850,
  }
  
  });
  
function WebStepper(props){
    const {activeStep,steps,classes} = props
    return(
        <Stepper
        className={classes.stepper}
        activeStep={activeStep}
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
    )
    
}


export default withStyles(styles)(WebStepper)
