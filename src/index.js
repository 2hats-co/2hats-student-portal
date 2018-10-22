import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import ReactPixel from 'react-facebook-pixel';

ReactPixel.init('2178522349094498', {}, { debug: true, autoConfig: false });
ReactPixel.pageView();
//ReactPixel.fbq('track', 'PageView');
const store = configureStore();
ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
