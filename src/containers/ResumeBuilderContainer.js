import React from "react";
import PropTypes from "prop-types";
//material
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
//child components
import LogoOnCard from "../components/LogoOnCard";
import SectionWrapper from "../components/SectionWrapper";
//form sections
import CareerInterests from "../components/InputFields/CareerInterests";
import EducationContainer from "../components/EduExp/EducationContainer";
import OtherInfo from '../components/SignUp/OtherInfo';
import BioAndSkills from '../components/SignUp/BioAndSkills';
import Completed from '../components/SignUp/Completed';
//Redux
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
//routing
import {INTRODUCTION} from '../constants/routes'
import {withRouter} from 'react-router-dom'
import { COLLECTIONS, LISTENER } from "../constants/firestore";


import * as _ from "lodash";
import StepController from "../components/SignUp/StepController";

import {PROCESS_TYPES,STEP_LABELS,ALL_STEPS} from '../constants/signUpProcess'
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
  process:PROCESS_TYPES.build,//['build','upload']
  interests: [],
  bio: "",
  skills: [],
  workingRights: "",
  phoneNumber: "",
  industry: "IT",
  education: [],
  experience: []},
  error: null
};
class ResumeBuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goToIntroduction = this.goToIntroduction.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }
  componentWillMount(){
    this.setState({activeStep:this.props.activeStep || 0})
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.profile !== this.props.profile){
     _.forOwn(Object.values(this.props.profile)[0],(value,key)=>{
      this.handleChange(key,value)
     })
    }
  }
  goToIntroduction(){
    this.props.history.push(INTRODUCTION)
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
          <SectionWrapper
            child={
              <CareerInterests preSelectedList={interests} changeHandler={this.handleChange.bind(this)} />
            }
            width={750}
            height={220}
          />
        );
      case ALL_STEPS.bio: return <SectionWrapper child={ 
      <BioAndSkills 
        industry={this.state.profile.industry}
       bio={this.state.profile.bio}
        interests={this.state.profile.interests}
         skills={this.state.profile.skills} 
         changeHandler={this.handleChange}/>
        } width={400} height={420} />
      case ALL_STEPS.education: return <SectionWrapper child={
        <EducationContainer industry={industry} name='education' changeHandler={this.handleChange.bind(this)} width={470}/>
      } width={400} height={420} />;
      case ALL_STEPS.experience: return  <SectionWrapper child={
        <EducationContainer industry={industry} name='experience' changeHandler={this.handleChange.bind(this)} width={470}/>        
      } width={400} height={420} />;
      case ALL_STEPS.other: return <SectionWrapper child={<OtherInfo phoneNumber={this.state.profile.phoneNumber} workingRights={this.state.profile.workingRights} changeHandler={this.handleChange}/>} width={250} height={270} />
      //case ALL_STEPS.upload:
      //case ALL_STEPS.profile:
      default: return "Uknown stepIndex";

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
    if(activeStep === 0){
     this.goToIntroduction()

    }else{
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
    const steps = STEP_LABELS[(this.state.profile.process)];
    const { activeStep } = this.state;
    const currentStep = STEP_LABELS[(this.state.profile.process)][this.state.activeStep]
    const stepController = (
      <StepController currentStep={currentStep} 
      profile={this.state.profile} 
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
                  child={
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      style={{ height: 150 }}
                    >
                      <Completed/>
                      {stepController}
                    </Grid>
                  }
                  width={750}
                  height={150}
                />
              ) : (
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                >
                  <Grid item>{this.getStepContent(currentStep,this.state.profile)}</Grid>
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
    loadData: props => listenerSettings =>
      props.firestore.setListener(listenerSettings),

    onNext: props => (profile) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        ...profile,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),

    onSubmit: props => () =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        hasSubmit:true,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      const eduListenerSettings = LISTENER(COLLECTIONS.education,this.props.uid)
      const expListenerSettings = LISTENER(COLLECTIONS.experience,this.props.uid)
        this.props.loadData(eduListenerSettings);
        this.props.loadData(expListenerSettings);
      this.props.loadData(profileListenerSettings);
    },
    componentWillUnmount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      const eduListenerSettings = LISTENER(COLLECTIONS.education,this.props.uid)
      const expListenerSettings = LISTENER(COLLECTIONS.experience,this.props.uid)
      this.props.firestore.unsetListener(profileListenerSettings);
      this.props.firestore.unsetListener(eduListenerSettings);
      this.props.firestore.unsetListener(expListenerSettings);
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({ 
     profile: firestore.data.profiles, // document data by id
  }))
)
export default enhance(
  withRouter(
    withStyles(styles)(ResumeBuilderContainer)
  )
)