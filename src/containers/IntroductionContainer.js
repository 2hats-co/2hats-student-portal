import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import LogoOnCard from "../components/LogoOnCard";
import CardSections from "../components/Introduction/CardSections";

import MobileIntro from "../components/Introduction/MobileIntro";
import MobileSubmission from "../components/Introduction/MobileSubmission";

import intro1 from "../assets/images/graphics/Intro1.png";
import intro2 from "../assets/images/graphics/Intro2.png";
import intro3 from "../assets/images/graphics/Intro3.png";

import BuildResume from "../assets/images/graphics/BuildResume.png";
import UploadResume from "../assets/images/graphics/UploadResume.png";
import * as routes from "../constants/routes";

//Redux
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import { connect } from 'react-redux';
import { withFirestore } from "../utilities/withFirestore";
//routing
import { withRouter } from "react-router-dom";
import { INTRODUCTION_CONTAINER } from "../constants/views";
import { COLLECTIONS, LISTENER } from "../constants/firestore";

import * as action from "../actions/AuthenticationContainerActions";

const styles = theme => ({
  root: {
    paddingTop: 40
  },
  sections: {
    marginTop: 30
  },
  header: {
    textAlign: "center"
  }
});

class IntroductionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: INTRODUCTION_CONTAINER.process };
    this.goToResumeOptions = this.goToResumeOptions.bind(this);
    this.goToUploadResume = this.goToUploadResume.bind(this);
    this.goToBuildResume = this.goToBuildResume.bind(this);
  }

  goToBuildResume() {
    this.props.history.push(routes.BUILD_RESUME);
  }

  goToUploadResume() {
    this.props.history.push(routes.UPLOAD_RESUME);
  }
  goToResumeOptions() {
    this.props.history.push(routes.SUBMISSION);
  }

  render() {
    const { classes, view, theme } = this.props;

    const process = {
      headLine: "Application Process",
      width: 900,
      sections: [
        {
          title: "Get Reviewed",
          image: intro1,
          description:
            "We will provide you a set of tailored and practical feedback based on your resume submission."
        },
        {
          title: "Get Assessed",
          image: intro2,
          description:
            "We will assess your capability in our interview & assessment centre. You will be provided with feedback for improvement. ",
          button: { label: `Let's start`, onClick: this.goToResumeOptions }
        },
        {
          title: "Get an Offer",
          image: intro3,
          description:
            "Once you have qualified through our assessment centre, we will match you with a paid placement in your chosen industry."
        }
      ]
    };
    const submission = {
      headLine: "Do you have a resume?",
      width: 680,
      sections: [
        {
          title: "Yes, I do",
          image: UploadResume,
          description: `You will be asked to upload your resume near the end of the sign-up process. If you don’t have it now, you can upload it later. `,
          button: { label: `I have a resume`, onClick: this.goToUploadResume }
        },
        {
          title: `No, I don't`,
          image: BuildResume,
          description: `Don't worry! We will help you build a professional resume through our quick and easy 5-step process.`,
          button: {
            label: `Help me build a resume`,
            onClick: this.goToBuildResume
          }
        }
      ]
    };
    const submissionView = (
      <div className={classes.root}>
        <Typography className={classes.header} variant="display1">
          {submission.headLine}
        </Typography>
        <div className={classes.sections}>
          <CardSections
            width={submission.width}
            sections={submission.sections}
            hasDivider
          />
        </div>
      </div>
    );
    const processView = (
      <div className={classes.root}>
        <Typography className={classes.header} variant="display1">
          {process.headLine}
        </Typography>
        <div className={classes.sections}>
          <CardSections
            hasSteps
            width={process.width}
            sections={process.sections}
          />
        </div>
      </div>
    );
    if (theme.responsive.isMobile) {
      return (
        <div>
          {view === INTRODUCTION_CONTAINER.process && (
            <MobileIntro
              tutorialSteps={process.sections}
              startHandler={this.goToResumeOptions}
            />
          )}
          {view === INTRODUCTION_CONTAINER.submission && (
            <MobileSubmission
              headLine={submission.headLine}
              uploadHandler={this.goToUploadResume}
              buildHandler={this.goToBuildResume}
            />
          )}
        </div>
      );
    } else {
      return (
        <LogoOnCard
          animateWidth={view === INTRODUCTION_CONTAINER.submission}
          startingWidth={900}
          width={view === INTRODUCTION_CONTAINER.process ? 900 : 680}
          height={566}
        >
          {view === INTRODUCTION_CONTAINER.process
            ? processView
            : submissionView}
        </LogoOnCard>
      );
    }
  }
}

IntroductionContainer.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {};
}
function mapActionToProps(dispatch) {
  return bindActionCreators(action.actions, dispatch);
}

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => listenerSettings =>
      props.firestore.setListener(listenerSettings)
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const profileListenerSettings = LISTENER(
        COLLECTIONS.profiles,
        this.props.uid
      );
      this.props.loadData(profileListenerSettings);
    }
  }),
  connect(
    mapStateToProps,
    mapActionToProps
  )
);
export default enhance(
  withRouter(withStyles(styles, { withTheme: true })(IntroductionContainer))
);
