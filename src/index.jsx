import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';
import 'styles.scss';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
console.log('###', initialState);
const store = configureStore(initialState);


ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <Router>
        <AppView />
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);


/* eslint-disable */
if (module.hot) {
  module.hot.accept('./views/AppView.jsx', () => {
    const UpdatedApp = require('./views/AppView.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router>
            <UpdatedApp />
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
/* eslint-enable */
