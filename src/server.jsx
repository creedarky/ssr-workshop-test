import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';
import routes from 'routes.jsx';
import Html from 'components/Html/Html.jsx';
import 'styles.scss';

export default function ({ req, context, style, scripts }) {
  const store = configureStore();

  const promises = routes.reduce((matches, route) => {
    const match = matchPath(req.url, route);
    if (match) {
      matches.push(
        route.component.fetchData ?
          route.component.fetchData({ match, dispatch: store.dispatch }) : Promise.resolve(null)
      );
    }
    return matches;
  }, []);

  return Promise.all(promises)
    .then(() => {
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <Router location={req.url} context={context}><AppView /></Router>
        </Provider>
      );

      return ReactDOMServer.renderToStaticMarkup(
        <Html style={style} scripts={scripts} initialState={store.getState()} markup={markup} />
      );
    });
}
