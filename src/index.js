import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import ReactPixel from 'react-facebook-pixel';

import metadata from './metadata.json';
console.log(
  'Build',
  metadata.hash,
  '\n',
  new Date(metadata.date).toLocaleString()
);

ReactPixel.init('2178522349094498', {}, { debug: true, autoConfig: false });
ReactPixel.pageView();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
