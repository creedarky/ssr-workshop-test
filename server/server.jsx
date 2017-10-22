/* eslint-disable no-unused-vars,no-console */
import React from 'react';
import renderApp from '../src/server.jsx';

function getCssFile(assets) {
  return assets.find(asset => /\.css$/.test(asset.name));
}

function getJSFile(assets) {
  return assets.find(asset => /\.js$/.test(asset.name));
}

module.exports = function serverRenderer({ clientStats }) {
  const script = getJSFile(clientStats.assets);
  const style = getCssFile(clientStats.assets);

  return (req, res, next) => {
    console.log(script, style);
    res.status(200).send(renderApp({ req, context: {}, script, style }));
  };
};
