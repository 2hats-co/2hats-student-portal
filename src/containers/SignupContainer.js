import React, { Component } from "react";
import PropTypes from "prop-types";
//material
import withStyles from "@material-ui/core/styles/withStyles";
//child components
import LogoOnCard from "../components/LogoOnCard";
//form sections
import SectionWrapper from "../components/SectionWrapper";
import {
  PROCESS_TYPES,
  STEP_LABELS,
  ALL_STEPS
} from "../constants/signUpProcess";
import CareerInterests from "../components/InputFields/CareerInterests";
import EduExp from "../components/EduExp";
import OtherInfo from "../components/SignUp/OtherInfo";
import PersonalBio from "../components/InputFields/PersonalBio";
import Skills from "../components/InputFields/Skills";
import ResumeLoader from "../components/InputFields/ResumeLoader";
//Redux
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
//routing
import { withRouter } from "react-router-dom";
import { COLLECTIONS, LISTENER } from "../constants/firestore";
import orderBy from "lodash.orderby";
import * as routes from "../constants/routes";
import StepController from "../components/SignUp/StepController";
import LoadingMessage from "../components/LoadingMessage";
import withAuthorisation from "../utilities/Session/withAuthorisation";
import CurrentUniversity from "../components/InputFields/CurrentUniversity";
import BuggyBoy from "../components/BuggyBoy";
const styles = theme => ({
  root: {
    height: 800
  },
  mobileContainer: {
    width: "100%"
  },
  webContainer: {
    width: "90%",
    padding: 35,
    paddingTop: 45
  },
  footerContainer: {
    width: 320
  },
  footerButton: {
    width: 140
  }
});
let INITIAL_PROFILE = {
  careerInterests: { type: "defualt", value: [] },
  currentStep: ALL_STEPS.careerInterests,
  bio: "",
  currentUniversity: "",
  skills: [],
  workingRights: "",
  workRestricted: -1,
  availableDays: "",
  availableDaysNum: -1,
  phoneNumber: "",
  industry: "IT",
  education: [],
  resumeFile: { name: "", fullPath: "", downloadURL: "" },
  experience: []
};
const INITIAL_STATE = {
  activeStep: 0,
  isLoading: false,
  profile: {},
  error: null,
  isOffline: false
};

class ResumeBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillMount() {
    if (this.props.history.location.search.includes("step")) {
      this.setState({
        activeStep: parseInt(this.props.history.location.search.split("=")[1])
      });
    }

    window.Intercom("update", {
      hide_default_launcher: true
    });
    window.Intercom("hide");

    if (this.props.profile) {
      for (const key in this.props.profile[0]) {
        if (this.props.profile[0].hasOwnProperty(key)) {
          this.handleChange(key, this.props.profile[0][key]);
        }
      }
    }
    if (this.props.history.location.pathname === routes.BUILD_RESUME) {
      let updatedProfile = Object.assign(
        { process: PROCESS_TYPES.build },
        INITIAL_PROFILE
      );
      this.setState({ profile: updatedProfile });
      this.props.onProfileUpdate({
        process: PROCESS_TYPES.build
        //   hasSubmit: false
      });
      this.props.onUserUpdate({ process: PROCESS_TYPES.build });
    } else if (this.props.history.location.pathname === routes.UPLOAD_RESUME) {
      let updatedProfile = Object.assign(
        { process: PROCESS_TYPES.upload },
        INITIAL_PROFILE
      );
      this.setState({ profile: updatedProfile });
      this.props.onProfileUpdate({
        process: PROCESS_TYPES.upload
        //    hasSubmit: false
      });
      this.props.onUserUpdate({ process: PROCESS_TYPES.upload });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile) {
      for (const key in this.props.profile[0]) {
        if (this.props.profile[0].hasOwnProperty(key)) {
          this.handleChange(key, this.props.profile[0][key]);
        }
      }
    }
    if (prevProps.user !== this.props.user) {
      const { profile, user, onProfileUpdate } = this.props;
      if (user.length === 0) {
        this.setState({ isOffline: true });
        return;
      } else {
        this.setState({ isOffline: false });
      }
      if (
        user[0].currentUniversity &&
        user[0].currentUniversity !== profile[0].currentUniversity
      ) {
        onProfileUpdate({ currentUniversity: user[0].currentUniversity });
      }
    }
  }
  handleChange(name, value) {
    if (name === "isLoading") {
      this.setState({ isLoading: value });
    } else {
      const newProfile = Object.assign(this.state.profile, { [name]: value });
      this.setState({ profile: newProfile });
    }
  }
  getStepContent(currentStep, profile) {
    const { careerInterests, industry } = profile;
    switch (currentStep) {
      case ALL_STEPS.careerInterests:
        return (
          <SectionWrapper width={750} height={340}>
            <CareerInterests
              preSelectedList={careerInterests}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.bio:
        return (
          <SectionWrapper width={750} height={340}>
            <PersonalBio
              industry={this.state.profile.industry}
              bio={this.state.profile.bio}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.skills:
        return (
          <SectionWrapper width={750} height={340}>
            <Skills
              interestKeys={this.state.profile.careerInterests.value}
              preSelectedList={this.state.profile.skills}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.education:
        return (
          <SectionWrapper width={750} height={340}>
            <EduExp
              industry={industry}
              name="education"
              changeHandler={this.handleChange}
              data={this.state.profile.education}
              width={600}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.experience:
        return (
          <SectionWrapper width={750} height={340}>
            <EduExp
              industry={industry}
              name="experience"
              changeHandler={this.handleChange}
              data={this.state.profile.experience}
              width={600}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.other:
        return (
          <SectionWrapper width={750} height={340}>
            <OtherInfo
              availableDays={this.state.profile.availableDays}
              phoneNumber={this.state.profile.phoneNumber}
              workingRights={this.state.profile.workingRights}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.currentUniversity:
        return (
          <SectionWrapper width={750} height={340}>
            <CurrentUniversity
              value={this.state.profile.currentUniversity}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      case ALL_STEPS.uploadResume:
        return (
          <SectionWrapper width={750} height={340}>
            <ResumeLoader
              resumeFile={this.state.profile.resumeFile}
              changeHandler={this.handleChange}
            />
          </SectionWrapper>
        );
      default:
        return "Unknown step";
    }
  }
  handleNext = () => {
    const { activeStep } = this.state;
    this.handleUpdate(activeStep);
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleUpdate = activeStep => {
    const { profile } = this.state;
    const currentStep = STEP_LABELS[profile.process][activeStep];
    switch (currentStep) {
      case ALL_STEPS.careerInterests:
        this.props.onProfileUpdate({
          careerInterests: profile.careerInterests,
          industry: profile.industry,
          completedStep: currentStep
        });
        break;
      case ALL_STEPS.bio:
        this.props.onProfileUpdate({
          bio: profile.bio,
          completedStep: currentStep
        });
      case ALL_STEPS.skills:
        this.props.onProfileUpdate({
          skills: profile.skills,
          completedStep: currentStep
        });
        break;
      case ALL_STEPS.currentUniversity:
        this.props.onProfileUpdate({
          currentUniversity: profile.currentUniversity,
          completedStep: currentStep
        });
        this.props.onUserUpdate({
          currentUniversity: profile.currentUniversity
        });
        break;
      case ALL_STEPS.education:
        let currentUniversity = "";
        if (profile.education) {
          const education = orderBy(profile.education, "endDateValue", "desc");
          currentUniversity = education[0].university;
        }
        this.props.onProfileUpdate({
          education: profile.education,
          completedStep: currentStep
        });
        this.props.onUserUpdate({ currentUniversity: currentUniversity });
        break;
      case ALL_STEPS.experience:
        this.props.onProfileUpdate({
          experience: profile.experience,
          completedStep: currentStep
        });
        break;
      case ALL_STEPS.uploadResume:
        this.props.onProfileUpdate({
          resumeFile: profile.resumeFile,
          bio: profile.bio,
          completedStep: currentStep
        });
        break;
      case ALL_STEPS.other:
        this.props.onProfileUpdate({
          completedStep: currentStep,
          phoneNumber: profile.phoneNumber,
          workingRights: profile.workingRights,
          availableDays: profile.availableDays
        });
        this.props.onUserUpdate({
          phoneNumber: profile.phoneNumber,
          workingRights: profile.workingRights,
          availableDays: profile.availableDays,
          availableDaysNum: profile.availableDaysNum,
          workRestricted: profile.workRestricted
        });
        break;
      default:
        break;
    }
  };
  handleBack = () => {
    const { activeStep } = this.state;
    if (activeStep !== 0) {
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
    const { classes, theme, user } = this.props;
    const { activeStep, profile, isLoading } = this.state;

    if (this.state.isOffline) {
      return (
        <LogoOnCard height={520} width={900}>
          <SectionWrapper height={420} width={900}>
            <div style={{ padding: 30 }}>
              <LoadingMessage
                message={`You are offline.
              Trying to reconnect you…`}
              />
            </div>
          </SectionWrapper>
        </LogoOnCard>
      );
    }
    if (profile.createdAt && user) {
      const currentStep = STEP_LABELS[profile.process][activeStep];
      return (
        <LogoOnCard width={850}>
          <div
            className={
              theme.responsive.isMobile
                ? classes.mobileContainer
                : classes.webContainer
            }
          >
            <StepController
              isLoading={isLoading}
              activeStep={activeStep}
              profile={profile}
              updateHandler={this.handleUpdate}
              nextHandler={this.handleNext}
              backHandler={this.handleBack}
            >
              {this.getStepContent(currentStep, profile)}
            </StepController>
          </div>
          <BuggyBoy userDoc={user[0]} profileDoc={profile} />
        </LogoOnCard>
      );
    } else {
      return (
        <LogoOnCard height={520} width={900}>
          <SectionWrapper height={420} width={900}>
            <div style={{ padding: 30 }}>
              <LoadingMessage message={`Hold onto your hat!`} />
            </div>
          </SectionWrapper>
        </LogoOnCard>
      );
    }
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
    onProfileUpdate: props => data =>
      props.firestore.update(
        { collection: COLLECTIONS.profiles, doc: props.uid },
        {
          ...data,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    onUserUpdate: props => data =>
      props.firestore.update(
        { collection: COLLECTIONS.users, doc: props.uid },
        {
          ...data,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      )
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      if (this.props.uid) {
        const profileListenerSettings = LISTENER(
          COLLECTIONS.profiles,
          this.props.uid
        );
        this.props.loadData(profileListenerSettings);
        const usersListenerSettings = LISTENER(
          COLLECTIONS.users,
          this.props.uid
        );
        this.props.loadData(usersListenerSettings);
      }
    },
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.uid !== this.props.uid) {
        const profileListenerSettings = LISTENER(
          COLLECTIONS.profiles,
          this.props.uid
        );
        this.props.loadData(profileListenerSettings);
        const usersListenerSettings = LISTENER(
          COLLECTIONS.users,
          this.props.uid
        );
        this.props.loadData(usersListenerSettings);
      }
    },
    componentWillUnmount() {
      const profileListenerSettings = LISTENER(
        COLLECTIONS.profiles,
        this.props.uid
      );
      this.props.firestore.unsetListener(profileListenerSettings);
      const usersListenerSettings = LISTENER(COLLECTIONS.users, this.props.uid);
      this.props.firestore.unsetListener(usersListenerSettings);
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({
    profile: firestore.ordered.profiles, // document data by id
    user: firestore.ordered.users // document data by id
  }))
);
const authCondition = authUser => !!authUser;
export default enhance(
  withRouter(
    compose(
      withAuthorisation(authCondition)(
        withStyles(styles, { withTheme: true })(ResumeBuilderContainer)
      )
    )
  )
);
