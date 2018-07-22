import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router-dom'
import {ALL_STEPS,checkComplition} from '../../constants/signUpProcess'
import * as routes from '../../constants/routes'
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


class StepController extends React.Component {
constructor(props){
  super(props);
  this.goToPreview = this.goToPreview.bind(this)
  this.goToLockedDashboard = this.goToLockedDashboard.bind(this)
}
goToPreview(){
  this.props.history.push(routes.PROFILE)
}
goToLockedDashboard(){
  this.props.nextHandler()
  this.props.history.push(routes.DASHBOARD)
}
disableNext(currentStep,profile){
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

  disableSave(currentStep,profile){
      return (currentStep===ALL_STEPS.education && profile.education.length === 0)
  }
render(){

 const{classes,profile,currentStep,nextHandler,backHandler} = this.props
 const nextButton = (<Button
    className={classes.button}
    disabled={checkComplition(currentStep,profile)}
    variant="flat"
    onClick={nextHandler}
  >
   {currentStep===ALL_STEPS.other?'Finish': 'Next'}
  </Button>)
 
  const previewButton = (<Button
    className={classes.button}
    style={{width:210}}
    variant="flat"
    onClick={this.goToPreview}
  >
  Preview for Submission
  </Button>)
  const backButton = (<Button
    className={classes.button}
    variant="outlined"
    onClick={currentStep===ALL_STEPS.interests?this.props.history.goBack:backHandler}
  >
    Back
  </Button>)
  const saveButton = (<Button
    className={classes.button}
    variant="outlined"
    disabled={this.disableSave(currentStep,profile)}
  onClick={this.goToLockedDashboard}
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
}
export default  withRouter(withStyles(styles)(StepController))