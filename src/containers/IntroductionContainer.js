import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LogoOnCard from '../components/LogoOnCard';
import CardSections from '../components/Introduction/CardSections';

import intro1 from '../assets/images/graphics/Intro1.png'
import intro2 from '../assets/images/graphics/Intro2.png'
import intro3 from '../assets/images/graphics/Intro3.png'

import BuildResume from '../assets/images/graphics/BuildResume.png'
import UploadResume from '../assets/images/graphics/UploadResume.png'

import SectionWrapper from '../components/SectionWrapper'
import * as routes from '../constants/routes'

//Redux
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
//routing
import {withRouter} from 'react-router-dom'
import { INTRODUCTION_CONTAINER } from '../constants/views';
import { COLLECTIONS, LISTENER } from "../constants/firestore";
import { PROCESS_TYPES } from '../constants/signUpProcess';

const styles = theme => ({
    root: {
      paddingTop:40,
    },
    sections:{
       marginTop:30,
    },header:{
      textAlign:'center'
    }
  });


     
class IntroductionContainer extends React.Component {
  state = {
    view: INTRODUCTION_CONTAINER.process
  }
  constructor(props) {
    super(props)
    this.goToResumeOptions = this.goToResumeOptions.bind(this)
    this.goToUploadResume = this.goToUploadResume.bind(this)
    this.goToBuildResume = this.goToBuildResume.bind(this)
    
  }

  goToBuildResume(){
    this.props.history.push(routes.BUILD_RESUME)
  }

  goToUploadResume(){
    this.props.history.push(routes.UPLOAD_RESUME)
  }
  goToResumeOptions(){
    this.setState({view: INTRODUCTION_CONTAINER.resumeOptions})
  }

  render(){

    const { classes } = this.props;
    const process = 
  { heading: 'Application Process',
  width:900,
  sections:[
    {title:'Get Reviewed',
    image:intro1,
    description:'2hats Professionals will you a set of tailored and practical feedback based on your resume.',
    },
    {title:'Get Assessed',
    image:intro2,
    description:'We will assess your capability through interviews & assessments and provide you actionable feedback for improvement.  ',
     button:{label: `Let's start`, onClick:this.goToResumeOptions}},
     {title:'Get Offer',
     image:intro3,
     description:'Once you are qualified, we will match you with a paid placement in your chosen career interests.'
    }]}
    const submission = 
        { heading: 'Resume Submission',
        width:680,
        sections:[{title:'Upload Resume',
        image:UploadResume,
        description:'If you have a resume already created, you can upload it directly to our platform to submit it for review instantly',
         button:{label: `Upload`,onClick:this.goToUploadResume}},
         {title:'Build Resume',
         image:BuildResume,
         description: `If you don't have a resume, we will help you build a professional resume through our quick and easy 5-Step process!`,
          button:{label: `Build`, onClick:this.goToBuildResume}
        }]
        }
  const submissionView = (<div className={classes.root}><Typography className={classes.header} variant="display1">
    {submission.heading}
 </Typography>
<div className={classes.sections} >
    <CardSections width={submission.width} sections={submission.sections} hasDivider/>
 </div></div>
 
)
     const processView = (<div className={classes.root}><Typography className={classes.header} variant="display1">
     {process.heading}
  </Typography>
 <div className={classes.sections} >
     <CardSections hasSteps width={process.width} sections={process.sections}/>
  </div></div>)
        
    return (
    <LogoOnCard 
    width={this.state.view === INTRODUCTION_CONTAINER.process? process.width:submission.width}
    >
    <SectionWrapper 
      height = {550}
     > {this.state.view === INTRODUCTION_CONTAINER.process? processView:submissionView}</SectionWrapper>
     </LogoOnCard>
    );
  }
}

IntroductionContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => listenerSettings =>
      props.firestore.setListener(listenerSettings),
      createUser: props => () =>

      props.firestore.set({ collection: COLLECTIONS.users, doc: props.uid }, {
        firstName: props.auth.displayName.split(' ')[0],
        lastName: props.auth.displayName.split(' ')[1],
        emailVerified: props.auth.emailVerified,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }

      ),
    createProfile: props => () =>

      props.firestore.set({ collection: COLLECTIONS.profiles, doc: props.uid }, {

        hasSubmit: false,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }
      ),
    
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      this.props.loadData(profileListenerSettings);
      this.props.createUser();
      this.props.createProfile();
    },
  }),
)
export default enhance(
  withRouter(
    withStyles(styles)(IntroductionContainer)
  )
)