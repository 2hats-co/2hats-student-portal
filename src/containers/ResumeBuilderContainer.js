import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CareerInterests from '../components/CareerInterests'
import LogoOnCard from '../components/LogoOnCard'
import { TextField } from '@material-ui/core';
import InputWrapper from '../components/InputWrapper'
import PhoneNumber from '../components/PhoneNumber';
import DropDown from '../components/DropDown';
import MultiLineTextField from '../components/MultiLineTextField';
import AutoCompleteField from '../components/AutoCompleteField';
import DialogForm from '../components/DailogForm'
import SkillsInput from '../components/SkillsInput';
import HeaderBar from '../components/HeaderBar';
import EduExpCard from '../components/EduExpCard';
import SectionWrapper from '../components/SectionWrapper'

const styles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
  },
  
  footerContainer:{
    alignSelf: 'flex-end',
    width: 320
  },
  footerButton:{
    width : 140
  }

});

function getSteps() {
  return ['Career Interests', 'Bio & Relevant Skills', 'Tertiary Education','Practical Experience','Other Information'];
}


const otherInfo = (<Grid
  container
  direction='row'
  justify='space-between'
  style={{height:200}}>
    <DropDown title='Residency Status' options={['Permanent resident','Student visa']} hint='Your residence status is required so that we can know whether you have any work restriction.'/>
    <PhoneNumber/>
  </Grid>)
  const bioSection = (<Grid
    container
    direction='row'
    justify='space-between'
    style={{height:275,width:400}}>
     <MultiLineTextField
        title='Personal Bio'
        hint= 'This bio should focus on your key achievement and what value you can bring to the position-providing companies.'
        placeholder='For example: 
        Hard-working student (80 WAM) with 3 months experience of UI design internship. I have more than 1-year of experience in using the Adobe creative suite tools, such as Adobe Photoshop and Adobe XD and would like to further utilise such skills in my future position.
        '
        characterLimit ={400}
        />
      <SkillsInput/>
    </Grid>)
    

      const experience = (<Grid container 
        direction='column' 
       alignItems='center'>
       <HeaderBar title='Practical Experience'/>
       <EduExpCard
       title='Bachelor of Commerce - Accounting'
       label = 'University of New South Wales'
       startDate= 'Feb 2016'
       endDate= 'Dec 2017'
        description ={`- 85+ WAM
        - Winner of FMAA Management Consulting Case Competition
        - President of AIESEC UNSW`}
       />
       </Grid>)
     const education = (<Grid container 
      direction='column' 
     alignItems='center'>
     <HeaderBar title='Education'/>
     <EduExpCard
     title='Bachelor of Commerce - Accounting'
     label = 'University of New South Wales'
     startDate= 'Feb 2016'
     endDate= 'Dec 2017'
      description ={`- 85+ WAM
      - Winner of FMAA Management Consulting Case Competition
      - President of AIESEC UNSW`}
     />
     </Grid>)
   
  
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0: 
  return (<SectionWrapper child={<CareerInterests/>} width={750} height={150}/>);
    case 1:
      return bioSection;
    case 2:
      return <SectionWrapper child={experience} width={400} height={350}/>;
    case 3:
      return <SectionWrapper child={education} width={400} height={350}/>;
    case 4:
      return(<SectionWrapper child={otherInfo} width={250} height={200}/>) ;
    default:
      return 'Uknown stepIndex';
  }
}

class ResumeBulderContainer extends React.Component {
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
        <LogoOnCard width={850}>
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
             
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="flat">
                  Submit resume
                </Button>
            </div>
          ) : (
              <Grid
              container
              direction='column'
              justify='space-between'
              style={{height:400}}
              >
              <Grid item>
              {getStepContent(activeStep)}
              </Grid>
              <Grid item>
              <Grid 
              className={classes.footerContainer}
              container
              direction='row'
              justify='space-between'
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
                variant="flat" onClick={this.handleNext}>
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

ResumeBulderContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResumeBulderContainer);