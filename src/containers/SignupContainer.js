import React,{Component} from "react";
import PropTypes from "prop-types";
//material
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
//child components
import LogoOnCard from "../components/LogoOnCard";
//form sections
import SectionWrapper from '../components/SectionWrapper'
import {PROCESS_TYPES,STEP_LABELS,ALL_STEPS} from '../constants/signUpProcess'
import CareerInterests from "../components/InputFields/CareerInterests";
import EducationContainer from "../components/EduExp/EducationContainer";
import OtherInfo from '../components/SignUp/OtherInfo';
import BioAndSkills from '../components/SignUp/BioAndSkills';
import Completed from '../components/SignUp/Completed';
import ProfileDetails from "../components/SignUp/ProfileDetails";
import UploadResume from "../components/SignUp/UploadResume";
//Redux
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
//routing
import {INTRODUCTION} from '../constants/routes'

import { COLLECTIONS, LISTENER } from "../constants/firestore";

import * as _ from "lodash";
import StepController from "../components/SignUp/StepController";

const styles = theme => ({
  root: {
    height: 800
  },
  container: {
    width: "100%",
    padding: 50
  },
  stepper: {
    width: 750,
    padding: 0
  },
  footerContainer: {
    width: 320
  },
  footerButton: {
    width: 140
  }
});

const INITIAL_STATE = {
  activeStep: 0,
  profile:{
  process:PROCESS_TYPES.upload,//['build','upload']
  interests: [],
  bio: "",
  currentUniversity:"",
  skills: [],
  workingRights: "",
  availableDays:"",
  phoneNumber: "",
  industry: "IT",
  education: [],
  resumeFile:{name:'',fullPath:''},
  experience: []},
  error: null
};
class ResumeBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }
  componentWillMount(){
   // this.setState({activeStep:this.props.activeStep || 0})
   //TODO chech url
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.profile !== this.props.profile){
     _.forOwn(Object.values(this.props.profile)[0],(value,key)=>{
      this.handleChange(key,value)
     })
    }
  }
  handleChange(name, value) {
    const newProfile = Object.assign(this.state.profile,{[name]:value})
    this.setState({ profile: newProfile });
  }
  getStepContent(currentStep,profile) { 
    const{interests,
     industry} = profile
    switch (currentStep) {
      case ALL_STEPS.interests: 
        return (
          <SectionWrapper width={750} height={220}>
              <CareerInterests preSelectedList={interests} changeHandler={this.handleChange} />
          </SectionWrapper>
         
        );
      case ALL_STEPS.bio: return <SectionWrapper width={400} height={420}>
      <BioAndSkills 
        industry={this.state.profile.industry}
       bio={this.state.profile.bio}
        interests={this.state.profile.interests}
         skills={this.state.profile.skills} 
         changeHandler={this.handleChange}/></SectionWrapper>
       
      case ALL_STEPS.education: return <SectionWrapper
        width={400} height={420}> 
        <EducationContainer industry={industry} 
          name='education' changeHandler={this.handleChange} 
          data = {this.state.profile.education}
          width={470}/>
        </SectionWrapper>;
      case ALL_STEPS.experience: return  <SectionWrapper width={400} height={420} >  
      <EducationContainer industry={industry} 
      name='experience' changeHandler={this.handleChange} 
      data = {this.state.profile.experience}      
      width={470}/>        
        </SectionWrapper>;
      case ALL_STEPS.other: return <SectionWrapper width={250} height={270}> <OtherInfo availableDays={this.state.profile.availableDays} phoneNumber={this.state.profile.phoneNumber} workingRights={this.state.profile.workingRights} changeHandler={this.handleChange}/></SectionWrapper>
      case ALL_STEPS.profileDetails:return <SectionWrapper width={400} height={420}> <ProfileDetails 
      industry={this.state.profile.industry}
      currentUniversity={this.state.profile.currentUniversity}
      interests={this.state.profile.interests}
       skills={this.state.profile.skills} 
       changeHandler={this.handleChange}/></SectionWrapper>;
      case ALL_STEPS.uploadResume:return <SectionWrapper width={400} height={420}><UploadResume 
      resumeFile={this.state.profile.resumeFile}
       bio={this.state.profile.bio}
       industry={this.state.profile.industry}
         changeHandler={this.handleChange}/></SectionWrapper>;
      default: return "Uknown step";

    }
  }
  handleNext = () => {
    this.props.onNext(this.state.profile)//update fire store
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };
  handleBack = () => {
    const { activeStep } = this.state;
    if(activeStep !== 0){
      this.setState({
        activeStep: activeStep - 1
      });
    }
  };
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  render() {
    const { classes } = this.props;

    const { activeStep ,profile} = this.state;
    const steps = STEP_LABELS[(profile.process)];
    const currentStep = STEP_LABELS[(profile.process)][activeStep]
    const stepController = (
      <StepController currentStep={currentStep} 
      profile={profile} 
      nextHandler={this.handleNext}
      backHandler={this.handleBack}/>
    )
    return (
        <LogoOnCard width={850} height={this.state.height}>
          <div className={classes.container}>
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
            <div>
              {this.state.activeStep === steps.length ? (
                <SectionWrapper
                 
                  width={750}
                  height={170}
                > <Grid
                container
                direction="column"
                justify="space-between"
                style={{ height: 200 }}
              >
                <Completed process={profile.process}/>
                {stepController}
              </Grid></SectionWrapper>
              ) : (
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                >
                  <Grid item>{this.getStepContent(currentStep,profile)}</Grid>
                  <Grid item>
                  {stepController}
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        </LogoOnCard>
      
    );
  }
}
ResumeBuilderContainer.propTypes = {
  classes: PropTypes.object,
  store: PropTypes.shape({
    firestore: PropTypes.object
  })
};
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    onNext: props => (profile) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        ...profile,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
  }),
 
  // Connect todos from redux state to props.profile
  connect(({ firestore }) => ({ 
     profile: firestore.data.profiles, // document data by id
  }))
)
export default enhance(
    withStyles(styles)(ResumeBuilderContainer)
)