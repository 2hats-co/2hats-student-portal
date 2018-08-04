import React, { Component } from 'react';
// material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from './Theme';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
import AuthenticationContainer from './containers/AuthenticationContainer'
import SignupContainer from './containers/SignupContainer'
import SubmissionContainer from './containers/SubmissionContainer'
import IntroductionContainer from './containers/IntroductionContainer';
import EmailVerificationContainer from './containers/EmailVerificationContainer';
import DashboardContainer from './containers/DashboardContainer';
import JobBoardContainer from './containers/JobBoardContainer';
import ProfileContainer from './containers/ProfileContainer';
 
//routing
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as routes from './constants/routes';
import {AUTHENTICATION_CONTAINER, INTRODUCTION_CONTAINER} from './constants/views'
import {ALL_STEPS} from './constants/signUpProcess'
import Landing from './components/Landing';



class App extends Component {
  constructor(props){
    super(props)
    this.state={theme:Theme}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

 componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}
componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}
 updateWindowDimensions() {
   const isMobile = window.innerWidth<700
   if(isMobile ==! this.state.theme.responsive.isMobile){
    this.setState({theme:Object.assign(Theme,{responsive:{width: window.innerWidth, height: window.innerHeight,isMobile }})});
   }
}
  render() {
  
    return (
      <MuiThemeProvider theme={this.state.theme}>

       <Router>
    <div className="app"> 
      <Route exact path={routes.SIGN_UP} component={() => <AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signUp}/>} />
      <Route exact path={routes.SIGN_IN} component={() =>  <AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.signIn}/>} />
      <Route exact path={routes.PASSWORD_FORGET} component={() =>  <AuthenticationContainer isPublic view={AUTHENTICATION_CONTAINER.resetPassword}/>} />
      <Route exact path={routes.DASHBOARD} component={() => <DashboardContainer />} />
      <Route exact path={routes.PROFILE} component={() => <ProfileContainer/>} />
      <Route exact path={routes.JOB_BOARD} component={() => <JobBoardContainer />} />
      <Route exact path={routes.INTRODUCTION} component={() => <IntroductionContainer view={INTRODUCTION_CONTAINER.process}/>} />
      <Route exact path={routes.SUBMISSION} component={() => <IntroductionContainer view={INTRODUCTION_CONTAINER.submission}/>} />
      <Route exact path={routes.BUILD_RESUME} component={() => <SignupContainer/>} />
      <Route exact path={routes.BUILD_RESUME_BIO} component={() => <SignupContainer currentStep={ALL_STEPS.bio} />} />
      <Route exact path={routes.BUILD_RESUME_EDU} component={() => <SignupContainer currentStep={ALL_STEPS.education} />} />
      <Route exact path={routes.BUILD_RESUME_EXP} component={() => <SignupContainer currentStep={ALL_STEPS.experience}/>} />
      <Route exact path={routes.BUILD_RESUME_OTHER} component={() => <SignupContainer currentStep={ALL_STEPS.other} />} />
      <Route exact path={routes.UPLOAD_RESUME} component={() => <SignupContainer/>} />
      <Route exact path={routes.EMAIL_VERIFICATION} component={() => <EmailVerificationContainer/>} />      
      <Route exact path={routes.PREVIOUS_SUBMISSION} component={() => <SubmissionContainer/>} />      
      <Route exact path={'/'} component={() => <Landing/>} />      
    </div>
  </Router>
 
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
