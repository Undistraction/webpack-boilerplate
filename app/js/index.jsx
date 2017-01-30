import 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application';
import '../css/main.css';

ReactDOM.render(
  <Application name={'REACT'} styleName={'App'} />
, document.getElementById('app'));
