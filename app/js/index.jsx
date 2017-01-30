/* eslint-disable global-require */

import 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import '../css/main.css';

ReactDOM.render(
  <AppContainer>
    <App name={'REACT'} styleName={'App'} />
  </AppContainer>,
 document.getElementById('app'));


// Needed for Hot Module Replacement
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp name={'REACT'} styleName={'App'} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
