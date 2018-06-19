import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AuthView from './Views/AuthView'
import ResumeBuilderView from './Views/ResumeBuilderView'

import IntroductionView from './Views/IntroductionView';
import { Theme } from './Theme';
import MultiLineTextField from './components/MultiLineTextField';
import LogoInCard from './components/LogoInCard';
import UploadResumeView from './Views/UploadResumeView';
import EmailVerificationView from './Views/EmailVerificationView';


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
      <div className="App">
       <EmailVerificationView/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
