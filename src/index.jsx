import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from 'root.jsx';
import configureStore from 'configureStore.js';

import 'styles.scss';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);


ReactDOM.hydrate(
  <AppContainer><Root store={store} /></AppContainer>,
  document.getElementById('app')
);


/* eslint-disable */
if (module.hot) {
  module.hot.accept('./root.jsx', () => {
    const NextRoot = require('./root.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
/* eslint-enable */
