import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'reducers/index.js';

function configureStore(initialState = {}) {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = typeof window !== 'undefined' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(reducer, initialState, enhancer);

  /* eslint-disable */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/index.js', () => {
      const nextRootReducer = require('reducers/index.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  /* eslint-enable */

  return store;
}

export default configureStore;
