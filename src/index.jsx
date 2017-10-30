import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import App from 'components/App/App.jsx';
import 'styles.scss';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
console.log('###', initialState);
const store = configureStore(initialState);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
  /* eslint-disable */
  if (module.hot) {
    module.hot.accept('./components/App/App.jsx', () => {
      const UpdatedApp = require('./components/App/App.jsx').default;
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
});
