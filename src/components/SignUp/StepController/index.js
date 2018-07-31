import React from "react";
import Button from "@material-ui/core/Button";


import WebStepper from './WebStepper'
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router-dom'
import {PROCESS_TYPES,ALL_STEPS,STEP_LABELS,checkComplition} from '../../../constants/signUpProcess'


import * as routes from '../../../constants/routes'
import DotMobileStepper from "./MobileStepper";



const styles = theme => ({
  root: {
    width: '100%'
  },
  button:{
   marginBottom:20,
   marginRight:20,
    height:35,
  //  width: 140
  paddingLeft:40,
  paddingRight:40,
  },webContent:{

  },mobileContent:{
  // merginLeft:-40,
  }
});

class StepController extends React.Component {
constructor(props){
  super(props);
  this.goToPreview = this.goToPreview.bind(this)
  this.goToDashboard = this.goToDashboard.bind(this)
  this.goToIntroduction = this.goToIntroduction.bind(this)
  this.handleBack = this.handleBack.bind(this)
  this.handleNext = this.handleNext.bind(this)
}
goToPreview(){
  this.props.history.push(routes.PROFILE)
}
goToIntroduction(){
  this.props.history.goBack()
}
goToDashboard(){
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
  handleBack(currentStep){
    currentStep===ALL_STEPS.interests?this.goToIntroduction():this.props.backHandler()
  }
  handleNext(currentStep){
    if(currentStep===ALL_STEPS.other)
    {this.goToPreview(),this.props.nextHandler()}else{this.props.nextHandler()}
  }
render(){

 const{classes,profile,activeStep,theme} = this.props
 const isMobile = theme.responsive.isMobile
 const steps = STEP_LABELS[(profile.process)];
 const currentStep = STEP_LABELS[(profile.process)][activeStep]
 const nextButton = (<Button
    className={classes.button}
    disabled={checkComplition(currentStep,profile)}
    variant="flat"
    onClick={()=>{this.handleNext(currentStep)}}
  >
   {currentStep===ALL_STEPS.other?'Preview for Submission':'Next'}
  </Button>)
 
  const backButton = (<Button
    className={classes.button}
    variant="outlined"
    onClick={()=>{this.handleBack(currentStep)}}
  >
    Back
  </Button>)
  const saveButton = (<Button
    className={classes.button}
    variant="outlined"
    disabled={this.disableSave(currentStep,profile)}
  onClick={this.goToDashboard}
  >
    Save for Later
  </Button>)
  const webButtons =(<Grid item>
    <Grid
className={classes.root}
container
direction="row"
justify='flex-start'
>
{backButton}
{currentStep&&nextButton}
{(currentStep===ALL_STEPS.education||currentStep===ALL_STEPS.experience||currentStep===ALL_STEPS.uploadResume)&&saveButton}
</Grid>
    </Grid>)
 return(
   <div>
            {isMobile && <DotMobileStepper nextDisabler={checkComplition(currentStep,profile)}
                                            handleNext={()=>{this.handleNext(currentStep)}} 
                                            handleBack={()=>{this.handleBack(currentStep)}} 
                                            steps={steps} activeStep={activeStep}/>}
            {!isMobile && <WebStepper steps={steps} activeStep={activeStep}/>}

                  <Grid
                  container
                  direction="column"
                  justify="space-between">
                  <Grid item>
                  <div className={isMobile?classes.mobileContent:classes.webContent}>
                  {this.props.children}
                  </div>
                  </Grid>
                  {!isMobile &&
                  webButtons
                  }
                </Grid>
    </div>
 )
}
}
export default  withRouter(withStyles(styles,{ withTheme: true })(StepController))