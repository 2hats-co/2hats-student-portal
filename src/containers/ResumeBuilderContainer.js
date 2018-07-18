import React from "react";
import PropTypes from "prop-types";
//material
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//child components
import CareerInterests from "../components/InputFields/CareerInterests";
import LogoOnCard from "../components/LogoOnCard";
import PhoneNumber from "../components/InputFields/PhoneNumber";
import DropDown from "../components/InputFields/DropDown";
import PersonalBio from "../components/InputFields/PersonalBio";
import Skills from "../components/InputFields/Skills";
import SectionWrapper from "../components/SectionWrapper";
import EducationContainer from "../components/EduExp/EducationContainer";
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
const styles = theme => ({
  root: {
    height: 800
  },
  container: {
    width: "100%",
    // margin: 'auto',
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

function getSteps() {
  return [
    "Career Interests",
    "Bio & Relevant Skills",
    "Tertiary Education",
    "Practical Experience",
    "Other Information"
  ];
}
const INITIAL_STATE = {

  activeStep: 0,
  profile:{
  interests: [],
  bio: "",
  skills: [],
  residency: "",
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
  bioSection = () => (
    <Grid
      container
      direction="row"
      justify="space-between"
      style={{ height: 275, width: 400 }}
    >
      <PersonalBio
        industry={this.state.profile.industry}
        bio={this.state.profile.bio}
        changeHandler={this.handleChange.bind(this)}
      />
      <Skills 
      interestKeys = {this.state.profile.interests}
      preSelectedList={this.state.profile.skills} 
      changeHandler={this.handleChange.bind(this)} />
    </Grid>
  );
  otherInfo = () =>(
    <Grid
      container
      direction="row"
      justify="space-between"
      style={{ height: 200 }}
    >
      <DropDown
        title="Residency Status"
        name="residency"
        value={this.state.profile.residency}
        changeHandler={this.handleChange.bind(this)}
        options={["Permanent resident", "Student visa"]}
        hint="Your residence status is required so that we can know whether you have any work restriction."
      />
      <PhoneNumber value={this.state.profile.phoneNumber} changeHandler={this.handleChange.bind(this)} />
    </Grid>
  );
  disableNext() {
    const {
      activeStep,
      profile
    } = this.state;
    const{interests,
      skills,
      bio,
      residency,
      phoneNumber} = profile
    switch (activeStep) {
      case 0:return interests.length === 0;
      case 1:return skills.length === 0 || bio.length === 0;
      case 2:return false;
      case 3:return false;
      case 4:return phoneNumber.length !== 10;
      default:return false;
    }
  }
  handleChange(name, value) {
    const newProfile = Object.assign(this.state.profile,{[name]:value})
    this.setState({ profile: newProfile });
  }
  getStepContent(stepIndex) {
   
    const{interests,
     industry} = this.state.profile
    switch (stepIndex) {
      case 0: 
        return (
          <SectionWrapper
            child={
              <CareerInterests preSelectedList={interests} changeHandler={this.handleChange.bind(this)} />
            }
            width={750}
            height={220}
          />
        );
      case 1: return <SectionWrapper child={this.bioSection()} width={400} height={420} />
      case 2: return <SectionWrapper child={
        <EducationContainer industry={industry} name='education' changeHandler={this.handleChange.bind(this)} width={470}/>
      } width={400} height={420} />;
      case 3: return  <SectionWrapper child={
        <EducationContainer industry={industry} name='experience' changeHandler={this.handleChange.bind(this)} width={470}/>        
      } width={400} height={420} />;
      case 4: return <SectionWrapper child={this.otherInfo()} width={250} height={270} />
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
    console.log(this.state)
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const congratulations = (
      <Grid
        container
        direction="row"
        justify="spacing-between"
        style={{ height: 100 }}
      >
        <Typography variant="title" color="primary" component="h3">
          Congratulations!
        </Typography>
        <Typography variant="body">
          You have filled all mandatory fields to build your resume using our
          guided processes.
        </Typography>
        <Typography variant="body">
          You can submit your resume for our review now.
        </Typography>
      </Grid>
    );
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
                      {congratulations}
                      <Grid
                        className={classes.footerContainer}
                        container
                        direction="row"
                        justify="space-between"
                      >
                        <Button
                          className={classes.footerButton}
                          variant="outlined"
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                        >
                          Back
                        </Button>
                        <Button
                          className={classes.footerButton}
                          variant="flat"
                          onClick={this.props.onSubmit}
                        >
                          Submit resume
                        </Button>
                      </Grid>
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
                  <Grid item>{this.getStepContent(activeStep)}</Grid>
                  <Grid item>
                    <Grid
                      className={classes.footerContainer}
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Button
                        className={classes.footerButton}
                        variant="outlined"
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        className={classes.footerButton}
                      //  disabled={this.disableNext.bind(this)()}
                        variant="flat"
                        onClick={this.handleNext}
                      >
                        Next
                      </Button>
                    </Grid>
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