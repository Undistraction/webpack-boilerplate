/* eslint-disable global-require */

import 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import '../css/main.css';

// Enable performance hints in development
if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

// Function to allow us to share app render with HMR setup.
const renderApp = (AppComponent) => {
  ReactDOM.render(
    // App is wrapped inside AppContainer to enable HMR in development. AppContainer effectively
    // becomes transparent in production.
    <AppContainer>
      <AppComponent name={'REACT'} />
    </AppContainer>,
   document.getElementById('app'));
};

// Render application
renderApp(App);

 // Enable Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
