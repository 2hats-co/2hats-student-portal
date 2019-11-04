import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import * as serviceWorker from './serviceWorker';
import ReactPixel from 'react-facebook-pixel';

import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_TRACKING_ID } from 'config/googleAnalytics';

import metadata from './metadata.json';
console.log(
  'Build',
  metadata.hash,
  '\n',
  new Date(metadata.date).toLocaleString()
);

// Show react-axe warnings for development mode
if (process.env.NODE_ENV !== 'production') {
  // var axe = require('react-axe');
  // axe(React, ReactDOM, 1000);
  // Debug Google Analytics
  ReactGA.initialize('DEBUG', { debug: true });
} else {
  // Enable React FB Pixel on production only
  ReactPixel.init('2178522349094498', {}, { debug: true, autoConfig: false });
  ReactPixel.pageView();
  // Enable real Google Analytics tracking
  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
}

ReactDOM.render(<App />, document.getElementById('root'));
// serviceWorker.register();
