import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import AppView from 'views/AppView/AppView.jsx';
import 'styles.scss';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
console.log('###', initialState);
const store = configureStore(initialState);

ReactDOM.hydrate(
  <Provider store={store}>
    <Router><AppView /></Router>
  </Provider>,
  document.getElementById('app')
);
