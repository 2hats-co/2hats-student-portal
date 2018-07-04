import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withAuthentication from './components/Session/withAuthentication';
import AuthContainer from './containers/AuthContainer'
import ResumeBuilderContainer from './containers/ResumeBuilderContainer'
import UploadResumeContainer from './containers/UploadResumeContainer';
import IntroductionContainer from './containers/IntroductionContainer';
import EmailVerificationContainer from './containers/EmailVerificationContainer';
import { Theme } from './Theme';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
      <div className="App">
      <ResumeBuilderContainer/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
