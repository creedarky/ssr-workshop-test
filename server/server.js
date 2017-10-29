/* eslint-disable no-unused-vars,no-console */
import React from 'react';
import renderApp from '../src/server.jsx';

function getCssFile(assets) {
  return assets.find(asset => /\.css$/.test(asset.name));
}

function getJSFile(assets) {
  return assets.filter(asset => /\.js$/.test(asset.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = function serverRenderer({ clientStats }) {
  console.log(clientStats.assets);
  const scripts = getJSFile(clientStats.assets);
  const style = getCssFile(clientStats.assets);

  return (req, res, next) => {
    console.log(scripts);
    renderApp({ req, context: {}, scripts, style })
      .then(html => res.status(200).send(html));
  };
};
