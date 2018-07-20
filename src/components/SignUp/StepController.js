import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {ALL_STEPS} from '../../constants/signUpProcess'

const styles = theme => ({
  root: {
    width: 320
  },
  button:{
    width: 140
  }
});

function disableNext(currentStep,profile){
    const{interests,
      skills,
      bio,
      workingRights,
      phoneNumber} = profile
    switch (currentStep) {
      case ALL_STEPS.interests:return interests.length === 0;
      case ALL_STEPS.bio:return skills.length === 0 || bio.length === 0;
      case ALL_STEPS.education:return false;
      case ALL_STEPS.experience:return false;
      case ALL_STEPS.other:return  workingRights.length === 0 // || phoneNumber.length !== 10;
      default:return false;
    }
  }

function StepController(props){
 const{classes,profile,currentStep,nextHandler,backHandler} = props
 const nextButton = (<Button
    className={classes.button}
    disabled={disableNext(currentStep,profile)}
    variant="flat"
    onClick={nextHandler}
  >
    Next
  </Button>)
  const finishButton = (<Button
    className={classes.button}
  disabled={disableNext(currentStep,profile)}
    variant="flat"
    onClick={nextHandler}
  >
  Finish
  </Button>)
  const previewButton = (<Button
    className={classes.button}
    variant="flat"
    onClick={nextHandler}
  >
  Preview for Submission
  </Button>)
  const backButton = (<Button
    className={classes.button}
    variant="outlined"
    onClick={backHandler}
  >
    Back
  </Button>)
  const saveButton = (<Button
    className={classes.button}
    variant="outlined"
    onClick={backHandler}
  >
    Save for Later
  </Button>)
  
 return(
    <Grid
    className={classes.root}
    container
    direction="row"
    justify="space-between"
  >
    {backButton}
   {nextButton}
    </Grid>
 )
}
export default  withStyles(styles)(StepController)