import React, { Component } from 'react';
// material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from './Theme';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
import AuthenticationContainer from './containers/AuthenticationContainer'
import ResumeBuilderContainer from './containers/ResumeBuilderContainer'
import UploadResumeContainer from './containers/UploadResumeContainer';
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
import {AUTHENTICATION_CONTAINER} from './constants/views'




class App extends Component {
  render() {
  
    return (
      <MuiThemeProvider theme={Theme}>

       <Router>
    <div className="app"> 
      <Route exact path={routes.SIGN_UP} component={() => <AuthenticationContainer view={AUTHENTICATION_CONTAINER.signUp}/>} />
      <Route exact path={routes.SIGN_IN} component={() =>  <AuthenticationContainer view={AUTHENTICATION_CONTAINER.signIn}/>} />
      <Route exact path={routes.PASSWORD_FORGET} component={() =>  <AuthenticationContainer view={AUTHENTICATION_CONTAINER.resetPassword}/>} />
      <Route exact path={routes.DASHBOARD} component={() => <DashboardContainer/>} />
      <Route exact path={routes.PROFILE} component={() => <ProfileContainer/>} />
      <Route exact path={routes.JOB_BOARD} component={() => <JobBoardContainer/>} />
      <Route exact path={routes.INTRODUCTION} component={() => <IntroductionContainer />} />
      <Route exact path={routes.BUILD_RESUME} component={() => <ResumeBuilderContainer/>} />
      <Route exact path={routes.BUILD_RESUME_BIO} component={() => <ResumeBuilderContainer activeStep={1}/>} />
      <Route exact path={routes.BUILD_RESUME_EDU} component={() => <ResumeBuilderContainer activeStep={2}/>} />
      <Route exact path={routes.BUILD_RESUME_EXP} component={() => <ResumeBuilderContainer activeStep={3}/>} />
      <Route exact path={routes.BUILD_RESUME_OTHER} component={() => <ResumeBuilderContainer activeStep={4}/>} />
      <Route exact path={routes.UPLOAD_RESUME} component={() => <UploadResumeContainer/>} />
      <Route exact path={routes.EMAIL_VERIFICATION} component={() => <EmailVerificationContainer/>} />      
    </div>
  </Router>
 
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
