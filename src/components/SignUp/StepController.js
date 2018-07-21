import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {ALL_STEPS} from '../../constants/signUpProcess'

const styles = theme => ({
  root: {
    width: 600
  },
  button:{
   marginBottom:20,
   marginRight:20,
    height:35,
    width: 140
  }
});

function disableNext(currentStep,profile){
    const{interests,
      skills,
      bio,
      workingRights,currentUniversity,resumeFile,
      education,experience} = profile
    switch (currentStep) {
      case ALL_STEPS.interests:return interests.length === 0;
      case ALL_STEPS.bio:return skills.length === 0 || bio.length === 0;
      case ALL_STEPS.uploadResume:return resumeFile.fullPath.length === 0;
      case ALL_STEPS.education:return education.length === 0 ;
      case ALL_STEPS.experience:return experience.length === 0 ;
      case ALL_STEPS.profileDetails:return currentUniversity.length === 0 ||  skills.length === 0;
      case ALL_STEPS.other:return  workingRights.length === 0 // || phoneNumber.length !== 10;
      default:return false;
    }
  }

function StepController(props){

 const{classes,profile,currentStep,nextHandler,backHandler} = props
 console.log(currentStep)
 const nextButton = (<Button
    className={classes.button}
    disabled={disableNext(currentStep,profile)}
    variant="flat"
    onClick={nextHandler}
  >
   {currentStep===ALL_STEPS.other?'Finish': 'Next'}
  </Button>)
 
  const previewButton = (<Button
    className={classes.button}
    style={{width:210}}
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
    justify='flex-start'
  >
    {backButton}
   {currentStep&&nextButton}
   {(currentStep===ALL_STEPS.education||currentStep===ALL_STEPS.experience||currentStep===ALL_STEPS.uploadResume)&&saveButton}
   {!currentStep&&previewButton}
    </Grid>
 )
}
export default  withStyles(styles)(StepController)