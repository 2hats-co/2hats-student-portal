import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withAuthentication from './components/Session/withAuthentication';
import AuthenticationContainer from './containers/AuthenticationContainer'
import ResumeBuilderContainer from './containers/ResumeBuilderContainer'
import UploadResumeContainer from './containers/UploadResumeContainer';
import IntroductionContainer from './containers/IntroductionContainer';
import EmailVerificationContainer from './containers/EmailVerificationContainer';
import { Theme } from './Theme';
import DashboardContainer from './containers/DashboardContainer';
import * as routes from './constants/routes';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>

       <Router>
    <div className="app"> 
      <Route exact path={routes.SIGN_UP} component={() => <AuthenticationContainer view='signup' />} />
      <Route exact path={routes.SIGN_IN} component={() =>  <AuthenticationContainer view='signin' />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() =>  <AuthenticationContainer view='reset' />} />
      <Route exact path={routes.DASHBOARD} component={() => <DashboardContainer/>} />
      <Route exact path={routes.INTRODUCTION} component={() => <IntroductionContainer />} />
      <Route exact path={routes.BUILD_RESUME} component={() => <ResumeBuilderContainer />} />
      <Route exact path={routes.UPLOAD_RESUME} component={() => <UploadResumeContainer />} />

    </div>
  </Router>
 
      </MuiThemeProvider>
    );
  }
}

export default 
withAuthentication(
  App
);
