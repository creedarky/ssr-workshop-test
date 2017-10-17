/* eslint-disable no-unused-vars,no-console */
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const App = require('../src/components/Footer/Footer.jsx').default;

console.log('##', App);
module.exports = function serverRenderer({ clientStats, serverStats, foo }) {
  console.log(clientStats, serverStats);
  return (req, res, next) => {
    res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>${foo}</title>
            </head>
            <body>
                <div id="root">${renderToString(<App />)}</div>
                <script src="/client.js"></script>
            </body>
            </html>
        `);
  };
};
