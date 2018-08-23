import React from "react";
import Button from "@material-ui/core/Button";

import WebStepper from './WebStepper'
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router-dom'
import {PROCESS_TYPES,ALL_STEPS,STEP_LABELS,checkComplition} from '../../../constants/signUpProcess'
import StyledLink from '../../StyledLink'
import * as routes from '../../../constants/routes'
import DotMobileStepper from "./MobileStepper";
const styles = theme => ({
  root: {
    width: '100%',
    marginTop:10,
  },
  button:{
   marginRight:20,
    height:35,
  //  width: 140
  paddingLeft:40,
  paddingRight:40,
  },webContent:{

  },mobileContent:{
   
    padding:10
  // merginLeft:-40,
  },finishLabel:{
    color:'#888',
    width:'100%',
    textAlign:'right',
    fontSize:15,
    marginBottom:20
  //  textDecoration:'underline',

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
    const{careerInterests,
      skills,
      bio,
      workingRights,currentUniversity,resumeFile,
      education,experience} = profile
    switch (currentStep) {
      case ALL_STEPS.careerInterests:return careerInterests.length === 0;
      case ALL_STEPS.bio:return skills.length === 0 || bio.length === 0;
      case ALL_STEPS.uploadResume:return resumeFile.fullPath.length === 0;
      case ALL_STEPS.education:return education.length === 0 ;
      case ALL_STEPS.experience:return experience.length === 0 ;
      case ALL_STEPS.profileDetails:return currentUniversity.length === 0 ||  skills.length === 0;
      case ALL_STEPS.other:return  workingRights.length === 0 // || phoneNumber.length !== 10;
      default:return false;
    }
  }

  showSave(currentStep,profile){
    switch (currentStep) {
      case ALL_STEPS.careerInterests:return false;
      case ALL_STEPS.bio:return false;
      case ALL_STEPS.uploadResume:return true;
      case ALL_STEPS.education:return profile.education.length !== 0 ;
      case ALL_STEPS.experience:return true;
      case ALL_STEPS.profileDetails:return false;
      case ALL_STEPS.other:return false // || phoneNumber.length !== 10;
      default:return false;
    }
      
  }
  handleBack(currentStep){
    const{profile,activeStep,updateHandler,backHandler} = this.props
    if(!checkComplition(currentStep,profile)){
     updateHandler(activeStep)
    }
    currentStep===ALL_STEPS.careerInterests?this.goToIntroduction():backHandler()
  }
  handleNext(currentStep){
    if(currentStep===ALL_STEPS.other)
    {this.goToPreview(),this.props.nextHandler()}else{this.props.nextHandler()}
  }
  handleSave(currentStep){
    const{profile,activeStep,updateHandler} = this.props
    if(!checkComplition(currentStep,profile)){
      updateHandler(activeStep)
     }
  }

render(){

 const{classes,profile,activeStep,theme} = this.props
 const isMobile = theme.responsive.isMobile
 const steps = STEP_LABELS[(profile.process)];
 const currentStep = STEP_LABELS[(profile.process)][activeStep]
 const nextButton = (<Button id={`next-${currentStep}`}
    className={classes.button}
    disabled={checkComplition(currentStep,profile)}
    variant="flat"
    onClick={()=>{this.handleNext(currentStep)}}
  >
   {currentStep===ALL_STEPS.other?'Preview':'Next'}
  </Button>)
 
  const backButton = (<Button id={`back-${currentStep}`}
    className={classes.button}
    variant="outlined"
    onClick={()=>{this.handleBack(currentStep)}}
  >
    Back
  </Button>)

  const saveLink = (<StyledLink onClick={()=>{this.handleSave(currentStep)}} className={classes.finishLabel} id={`saveAt-${currentStep}`} key={`saveAt-${currentStep}`} href={'/dashboard'}>
      Finish Later
    </StyledLink>)
  const saveButtonWithConditions = ((this.showSave(currentStep,profile))&&saveLink)
  const webButtons =(<Grid item style={{height:35}}>
    <Grid
//className={classes.root}
container
direction="row"
alignItems='center'
justify='space-between'
>
<Grid item sm={10}>
<Grid
//className={classes.root}
container
direction="row"
alignItems='flex-end'
justify='flex-start'
>
{backButton}
{currentStep&&nextButton}
</Grid>
</Grid>
<Grid item sm={2} style={{textAlign:'right'}}>
{saveButtonWithConditions}
</Grid>
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
                  <div className={isMobile?classes.mobileContent:classes.webContent} >
                  {this.props.children}
                  </div>
                  </Grid>
                  {!isMobile &&
                  webButtons
                  }
                  {isMobile&&
                    <Grid container style={{width:'90%'}} direction='row' justify='flex-end'>
                     <Grid item>
                        {saveButtonWithConditions}
                     </Grid>
                    </Grid>
                    }
                </Grid>
    </div>
 )
}
}
export default  withRouter(withStyles(styles,{ withTheme: true })(StepController))