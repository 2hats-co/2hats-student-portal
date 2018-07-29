import React, { Component } from 'react';
// material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from './Theme';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
import AuthenticationContainer from './containers/AuthenticationContainer'
import SignupContainer from './containers/SignupContainer'
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
import {ALL_STEPS} from './constants/signUpProcess'
import Landing from './components/Landing';


import ReactGA from 'react-ga';

const DEFAULT_CONFIG = {
  trackingId: '',
  debug: true,
  gaOptions: {
    cookieDomain: 'none'
  }
};

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
      <Route exact path={routes.DASHBOARD} component={() => <DashboardContainer isPublic={false}/>} />
      <Route exact path={routes.PROFILE} component={() => <ProfileContainer isPublic={false}/>} />
      <Route exact path={routes.JOB_BOARD} component={() => <JobBoardContainer isPublic={false}/>} />
      <Route exact path={routes.INTRODUCTION} component={() => <IntroductionContainer isPublic={false}/>} />
      <Route exact path={routes.BUILD_RESUME} component={() => <SignupContainer isPublic={false}/>} />
      <Route exact path={routes.BUILD_RESUME_BIO} component={() => <SignupContainer currentStep={ALL_STEPS.bio} isPublic={false}/>} />
      <Route exact path={routes.BUILD_RESUME_EDU} component={() => <SignupContainer currentStep={ALL_STEPS.education} isPublic={false}/>} />
      <Route exact path={routes.BUILD_RESUME_EXP} component={() => <SignupContainer currentStep={ALL_STEPS.experience} isPublic={false}/>} />
      <Route exact path={routes.BUILD_RESUME_OTHER} component={() => <SignupContainer currentStep={ALL_STEPS.other} isPublic={false}/>} />
      <Route exact path={routes.UPLOAD_RESUME} component={() => <SignupContainer isPublic={false}/>} />
      <Route exact path={routes.EMAIL_VERIFICATION} component={() => <EmailVerificationContainer isPublic={true}/>} />      
      <Route exact path={'/'} component={() => <Landing isPublic={true}/>} />      
    </div>
  </Router>
 
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
