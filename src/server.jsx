/* eslint-disable */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import configureStore from 'configureStore.js';
import App from 'components/App/App.jsx';
import routes from 'routes.jsx';
import Html from 'components/Html/Html.jsx';
import 'styles.scss';
import stats from '../dist/react-loadable.json';

function flatten(arr) {
  return [].concat.apply([], arr);
}

function uniq(arr) {
  return [...new Set(arr)];
}

function isTruthy(val) {
  return !!val;
}

function getJsByModuleIds(moduleIds, { modulesById, chunksById }) {
  const chunkIds = flatten(
    moduleIds.map(id => {
      const clientModule = modulesById[id];
      if (!clientModule) {
        throw new Error(`${id} not found in client stats`);
      }
      return clientModule.chunks;
    })
  );
  return flattenUniq(
    chunkIds.map(id => {
      return chunksById[id].files
        .filter(file => /\.js$/.test(file))
        .filter(file => !/\.hot-update\.js$/.test(file));
    })
  );
}

function getCssByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.css$/.test(asset));
}

function getCss(stats) {
  return [getCssByChunkName('index', stats)].filter(isTruthy);
}


function getJsByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.js$/.test(asset));
}


export default function ({ req, context, clientStats }) {
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
      const modules = [];
      const markup = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store}>
            <Router location={req.url} context={context}><App /></Router>
          </Provider>
        </Loadable.Capture>
      );

      console.log('###', markup)
      // console.log('### modules', modules, scripts);
      const bundles = getBundles(stats, modules);
      const scripts = [
        getJsByChunkName('bootstrap', clientStats),
        ...bundles.map(b => b.file),
        getJsByChunkName('index', clientStats),
      ];
      console.log('###', scripts);
      const style = getCss(clientStats);
      console.log('### bundles', bundles);
      return ReactDOMServer.renderToStaticMarkup(
        <Html style={style} scripts={scripts} initialState={store.getState()} markup={markup} />
      );
    });
}
