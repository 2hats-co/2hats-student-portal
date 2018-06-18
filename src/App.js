import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AuthView from './Views/AuthView'
import ResumeBuilderView from './Views/ResumeBuilderView'

import IntroductionView from './Views/IntroductionView';
import { Theme } from './Theme';


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
      <div className="App">
        <IntroductionView/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
