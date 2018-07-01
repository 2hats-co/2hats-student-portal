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
import PhoneNumber from '../components/PhoneNumber';
import DropDown from '../components/DropDown';
import MultiLineTextField from '../components/MultiLineTextField';
import SkillsInput from '../components/SkillsInput';
import HeaderBar from '../components/HeaderBar';
import EduExpCard from '../components/EduExpCard';
import SectionWrapper from '../components/SectionWrapper'

const styles = theme => ({
  root: {
   
   height:800
  },
  container:{
    width: '100%',
    // margin: 'auto',
    padding:50,
  },
  stepper:{
    width:750,
    padding:0
  },
  
  footerContainer:{
  
    width: 320
  },
  footerButton:{
    width : 140
  }

});

function getSteps() {
  return ['Career Interests', 'Bio & Relevant Skills', 'Tertiary Education','Practical Experience','Other Information'];
}




      const experience = (<Grid container 
        direction='column' 
       alignItems='center'>
       <HeaderBar title='Practical Experience'/>
       <EduExpCard
       title='UI Design Intern'
       label = '3hats Inc. / Employment'
       startDate= 'May 2018'
       endDate= 'Present'
        description ={`- Re-created 3hats' key product page, which resulted in 50% more page visits
        - Created the wireframes and prototypes of a new feature`}
       />
       </Grid>)
     const education = (<Grid container 
      direction='column' 
     alignItems='center'>
     <HeaderBar title='Tertiary Education'/>
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

  const INITIAL_STATE = {
    activeStep: 0,
    interests:[],
    bio:'',
    skills:[],  
    residency:' ',
    phoneNumber:0,
    email: '',
    error: null,
  };
  
class ResumeBuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  bioSection = (<Grid
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
        changeHandler={this.handleChange.bind(this)}
        />
      <SkillsInput changeHandler={this.handleChange.bind(this)} />
    </Grid>)
    otherInfo = (<Grid
      container
      direction='row'
      justify='space-between'
      style={{height:200}}>
        <DropDown title='Residency Status' name='residency' value={'res'} changeHandler={this.handleChange.bind(this)} options={['Permanent resident','Student visa']} hint='Your residence status is required so that we can know whether you have any work restriction.'/>
        <PhoneNumber changeHandler={this.handleChange.bind(this)}/>
      </Grid>)
  disableNext(){
    const {activeStep,interests,skills,bio,residency,phoneNumber}= this.state
    let disabled = true
    console.log(activeStep,phoneNumber.length)

    switch (activeStep) {
      case 0:
      disabled = (interests.length===0)
        break;
        case 1:disabled = (skills.length===0 || bio.length===0)
      
          break;
          case 2:disabled =false
      
          break;
          case 3:disabled =false
      
          break;
          case 4:disabled = (phoneNumber.length!==10)
      
          break;
      default:
      break;
    }
    return disabled
 
  }
  handleChange(name,value){
    this.setState({[name]:value})
  }
  
   getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: //this.setState({height:390})
    return (<SectionWrapper child={<CareerInterests changeHandler={this.handleChange.bind(this)} />} width={750} height={220}/>);
      case 1: //this.setState({height:590})
        return <SectionWrapper child={this.bioSection} width={400} height={420}/> ;
      case 2://this.setState({height:590})
        return <SectionWrapper child={experience} width={400} height={420}/>;
      case 3: //this.setState({height:440})
        return <SectionWrapper child={education} width={400} height={420}/>;
      case 4: //this.setState({height:330})
        return(<SectionWrapper child={this.otherInfo} width={250} height={270}/>) ;
      default:
        return 'Uknown stepIndex';
    }
  }
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
    console.log(this.state)
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const congratulations = (<Grid container direction='row' justify='spacing-between' style={{height:100}}>
  <Typography variant="title" color="primary" component="h3">
  Congratulations!
  </Typography>
    <Typography variant='body'>
    You have filled all mandatory fields to build your resume using our guided processes.
    </Typography>

    <Typography variant='body'>
    You can submit your resume for our review now.
    </Typography>
  </Grid>)
    return (
      <div className={classes.root}>
       
        <LogoOnCard width={850} 
        height={this.state.height}
        >
      <div className={classes.container}>
        <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
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
            <SectionWrapper child={(<Grid
              container
              direction='column'
              justify='space-between'
              style={{height:150}}
            >{congratulations}<Grid 
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
                  Submit resume
                </Button>
            </Grid></Grid>)} width={750} height={150}/>
            
          ) : (
              <Grid
              container
              direction='column'
              justify='space-between'
              //style={{height:400}}
              >
              <Grid item>
              {this.getStepContent(activeStep)}
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
                 className={classes.footerButton} disabled={this.disableNext.bind(this)()}
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

ResumeBuilderContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResumeBuilderContainer);