import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CareerInterests from "../components/CareerInterests";
import LogoOnCard from "../components/LogoOnCard";
import PhoneNumber from "../components/PhoneNumber";
import DropDown from "../components/DropDown";
import MultiLineTextField from "../components/MultiLineTextField";
import SkillsInput from "../components/SkillsInput";
import SectionWrapper from "../components/SectionWrapper";
import {getPrompts} from '../constants/resumeBuilderPrompts'
import EducationContainer from "../components/EduExp/EducationContainer";
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
  //activeStep: 0,
  activeStep: 2,
  interests: [],
  bio: "",
  skills: [],
  residency: "",
  phoneNumber: "",
  email: "",
  industry: "IT",
  education: [{degree:"Bachelor of Commerce - Accounting",university:"University of New South Wales",startDate:"Feb 2016",endDate:"Dec 2017",description:`- 85+ WAM
  - Winner of FMAA Management Consulting Case Competition
  - President of AIESEC UNSW`}],
  experience: [{title:"Bachelor of Commerce - Accounting",company:"University of New South Wales",startDate:"Feb 2016",endDate:"Dec 2017",description:`- 85+ WAM
  - Winner of FMAA Management Consulting Case Competition
  - President of AIESEC UNSW`}],
  error: null
};
class ResumeBuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  bioSection = () => (
    <Grid
      container
      direction="row"
      justify="space-between"
      style={{ height: 275, width: 400 }}
    >
      <MultiLineTextField
        title="Personal Bio"
        hint="This bio should focus on your key achievement and what value you can bring to the position-providing companies."
        placeholder={` For example: ${getPrompts(this.state.industry).bio}`}
        value={this.state.bio}
        name='bio'
        characterLimit={400}
        changeHandler={this.handleChange.bind(this)}
      />
      <SkillsInput 
      preSelectedList={this.state.skills} 
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
        value={this.state.residency}
        changeHandler={this.handleChange.bind(this)}
        options={["Permanent resident", "Student visa"]}
        hint="Your residence status is required so that we can know whether you have any work restriction."
      />
      <PhoneNumber value={this.state.phoneNumber} changeHandler={this.handleChange.bind(this)} />
    </Grid>
  );
  disableNext() {
    const {
      activeStep,
      interests,
      skills,
      bio,
      residency,
      phoneNumber
    } = this.state;
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
    this.setState({ [name]: value });
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: //this.setState({height:390})
        return (
          <SectionWrapper
            child={
              <CareerInterests preSelectedList={this.state.interests} changeHandler={this.handleChange.bind(this)} />
            }
            width={750}
            height={220}
          />
        );
      case 1: return <SectionWrapper child={this.bioSection()} width={400} height={420} />
      case 2: return <SectionWrapper child={
        <EducationContainer changeHandler={this.handleChange.bind(this)} items ={this.state.education}/>
      } width={400} height={420} />;
      case 3: return  <SectionWrapper child={
        <EducationContainer/>
      } width={400} height={420} />;
      case 4: return <SectionWrapper child={this.otherInfo()} width={250} height={270} />
      default: return "Uknown stepIndex";
    }
  }
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  render() {
    console.log(this.state);
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
      <div className={classes.root}>
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
                          onClick={this.handleNext}
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
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        className={classes.footerButton}
                        disabled={this.disableNext.bind(this)()}
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
      </div>
    );
  }
}
ResumeBuilderContainer.propTypes = {
  classes: PropTypes.object
};
export default withStyles(styles)(ResumeBuilderContainer);
