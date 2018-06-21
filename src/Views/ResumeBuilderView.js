import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CareerInterests from '../components/CareerInterests'
import LogoOnCard from '../components/LogoOnCard'
import { TextField } from '@material-ui/core';
import InputWrapper from '../components/InputWrapper'
import PhoneNumber from '../components/PhoneNumber';
const styles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },

  stepContainer:{
    
  },
  inputField:{
    width: '100%'
  }

});


function getSteps() {
  return ['Career Interests', 'Bio & Relevant Skills', 'Tertiary Education','Practical Experience','Other Information'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <PhoneNumber/>;
    case 1:
      return 'Bio & Relevant Skills';
    case 2:
      return 'Tertiary Education';
    case 3:
      return 'Practical Experience';
    case 4:
      return 'Other Information';
    default:
      return 'Uknown stepIndex';
  }
}

class ResumeBulderView extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
   
    return (
      <div>
        <LogoOnCard>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
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
            <div>
                <Typography variant="headline" color="primary" component="h3">
          Congratulations!
        </Typography>
              <Typography className={classes.instructions}>
              You have filled all mandatory fields to build your resume using our guided processes.
                You can submit your resume for our review now.
              </Typography>
              <Button  variant="outlined"
              color="primary"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary">
                  Submit resume
                </Button>
            </div>
          ) : (
            <div className={classes.stepContainer}>
              {getStepContent(activeStep)}
              <div>
                <Button  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                 // className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="flat" color="primary" onClick={this.handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </LogoOnCard>
      </div>
    );
  }
}

ResumeBulderView.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResumeBulderView);