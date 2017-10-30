/* eslint-disable no-unused-vars,no-console */
import React from 'react';
import renderApp from '../src/server.jsx';

module.exports = function serverRenderer({ clientStats }) {
  return (req, res, next) => {
    // console.log(scripts);
    renderApp({ req, context: {}, clientStats })
      .then(html => res.status(200).send(html));
  };
};
