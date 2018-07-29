import React,{Component} from "react";
import PropTypes from "prop-types";
//material
import { withStyles } from "@material-ui/core/styles";
//child components
import LogoOnCard from "../components/LogoOnCard";
//form sections
import SectionWrapper from '../components/SectionWrapper'
import {PROCESS_TYPES,STEP_LABELS,ALL_STEPS} from '../constants/signUpProcess'
import CareerInterests from "../components/InputFields/CareerInterests";
import EducationContainer from "../components/EduExp/EducationContainer";
import OtherInfo from '../components/SignUp/OtherInfo';
import BioAndSkills from '../components/SignUp/BioAndSkills';
import ProfileDetails from "../components/SignUp/ProfileDetails";
import ResumeLoader from "../components/InputFields/ResumeLoader";
//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
//routing
import {withRouter} from 'react-router-dom'
import { COLLECTIONS } from "../constants/firestore";

import * as _ from "lodash";
import * as routes from '../constants/routes';
import StepController from "../components/SignUp/StepController";
const styles = theme => ({
  root: {
    height: 800
  },
  mobileContainer: {
    width: "100%",
  },
  webContainer: {
    width: "90%",
    padding: 50
  },
  footerContainer: {
    width: 320
  },
  footerButton: {
    width: 140
  }
});
let INITIAL_PROFILE = {
  //process:PROCESS_TYPES.build,//['build','upload']
  interests: [],
  currentStep:ALL_STEPS.interests,
  bio: "",
  currentUniversity:"",
  skills: [],
  workingRights: "",
  availableDays:"",
  phoneNumber: "",
  industry: "IT",
  education: [],
  resumeFile:{name:'',fullPath:''},
  experience: []}
const INITIAL_STATE = {
  activeStep: 0,
  profile:{},
  error: null,
};

function AvailableDaysConverter(string){
  const  days = string
  let  number = parseInt(days)
    if(days.includes('½')){
      number = number+0.5
    }
   return number
}
class ResumeBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)

  }
  componentWillMount(){
    
   
    if(this.props.profile){
      _.forOwn(Object.values(this.props.profile)[0],(value,key)=>{
        this.handleChange(key,value)
       })
    }
    if(this.props.history.location.pathname === routes.BUILD_RESUME){
      let updatedProfile = Object.assign({process:PROCESS_TYPES.build},INITIAL_PROFILE)
      this.setState({profile:updatedProfile})
      this.props.onProfileUpdate({process:PROCESS_TYPES.build,hasSubmit:false})
    }else if(this.props.history.location.pathname === routes.UPLOAD_RESUME){
      let updatedProfile = Object.assign({process:PROCESS_TYPES.upload},INITIAL_PROFILE)
      this.setState({profile:updatedProfile})
      this.props.onProfileUpdate({process:PROCESS_TYPES.upload,hasSubmit:false})
    }
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
      case ALL_STEPS.bio: return <SectionWrapper width={750} height={420}>
      <BioAndSkills
        industry={this.state.profile.industry}
       bio={this.state.profile.bio}
        interests={this.state.profile.interests}
         skills={this.state.profile.skills} 
         changeHandler={this.handleChange}/></SectionWrapper>
      case ALL_STEPS.education: return <SectionWrapper
        width={750} height={420}> 
        <EducationContainer industry={industry}
          name='education' changeHandler={this.handleChange} 
          data = {this.state.profile.education}
          width={600}/>
        </SectionWrapper>;
      case ALL_STEPS.experience: return  <SectionWrapper width={750} height={420} >  
      <EducationContainer industry={industry}
      name='experience' changeHandler={this.handleChange} 
      data = {this.state.profile.experience}      
      width={600}/>        
        </SectionWrapper>;
      case ALL_STEPS.other: return <SectionWrapper width={750} height={270} >
       <OtherInfo availableDays={this.state.profile.availableDays} phoneNumber={this.state.profile.phoneNumber} 
       workingRights={this.state.profile.workingRights} changeHandler={this.handleChange}/></SectionWrapper>
      case ALL_STEPS.profileDetails:return <SectionWrapper width={750} height={420}> <ProfileDetails 
      industry={this.state.profile.industry}
      currentUniversity={this.state.profile.currentUniversity}
      interests={this.state.profile.interests}
       skills={this.state.profile.skills} 
       changeHandler={this.handleChange}/></SectionWrapper>;
      case ALL_STEPS.uploadResume:return <SectionWrapper width={750} 
      height={450}
      >
      <ResumeLoader 
      resumeFile={this.state.profile.resumeFile} 
      changeHandler={this.handleChange}/>
      </SectionWrapper>;
      default: return "Uknown step";
    }
  }
  handleNext = () => {
    const {profile} = this.state
    const { activeStep } = this.state;
    const currentStep = STEP_LABELS[(profile.process)][activeStep]
    switch (currentStep) {
      case ALL_STEPS.interests:this.props.onProfileUpdate({interests:profile.interests,industry:profile.industry,completedStep:currentStep})
      break;
      case ALL_STEPS.bio:this.props.onProfileUpdate({bio:profile.bio,skills:profile.skills,completedStep:currentStep})
      break; 
      case ALL_STEPS.profileDetails:this.props.onProfileUpdate({skills:profile.skills,currentUniversity:profile.currentUniversity,completedStep:currentStep})
      this.props.onUserUpdate({currentUniversity:profile.currentUniversity})
      break; 
      case ALL_STEPS.education:this.props.onProfileUpdate({education:profile.education,completedStep:currentStep})
      this.props.onUserUpdate({currentUniversity:profile.education[0].university})//TODO: make it smarter
      break; 
      case ALL_STEPS.experience:this.props.onProfileUpdate({experience:profile.experience,completedStep:currentStep})
      break; 
      case ALL_STEPS.uploadResume:this.props.onProfileUpdate({resumeFile:profile.resumeFile,bio:profile.bio,completedStep:currentStep})
      break; 
      case ALL_STEPS.other:this.props.onProfileUpdate({completedStep:'completed',isComplete:true,
      phoneNumber:profile.phoneNumber,workingRights:profile.workingRights,availableDays:profile.availableDays})
      this.props.onUserUpdate({phoneNumber:profile.phoneNumber,workingRights:profile.workingRights,availableDays:AvailableDaysConverter(profile.availableDays)})
      break;
      default:
        break;
    }
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
    const { classes,theme } = this.props;
    const { activeStep ,profile} = this.state;
    const currentStep = STEP_LABELS[(profile.process)][activeStep]
  
    return (
        <LogoOnCard>
          <div className={theme.responsive.isMobile?classes.mobileContainer:classes.webContainer}>
                  <StepController 
                  activeStep={activeStep}
                  profile={profile} 
                  nextHandler={this.handleNext}
                  backHandler={this.handleBack}>
                  {this.getStepContent(currentStep,profile)}
                  </StepController>
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
    onProfileUpdate: props => (data) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        ...data,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
    onUserUpdate: props => (data) =>
        props.firestore.update({ collection: COLLECTIONS.users, doc: props.uid }, {
        ...data,
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
    withRouter(withStyles(styles,{ withTheme: true })(ResumeBuilderContainer))
)