import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';
import Html from 'components/Html/Html.jsx';
import 'styles.scss';

export default function (props) {
  const store = configureStore();
  const state = store.getState();
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router location={props.req.url} context={props.context} ><AppView /></Router>
    </Provider>
  );

  return ReactDOMServer.renderToStaticMarkup(
    <Html style={props.style} script={props.script} initialState={state} markup={markup} />
  );
}
