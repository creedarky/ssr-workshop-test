const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const api = require('./api');
const clientConfig = require('../webpack.config.js');
const serverConfig = require('../webpack.server.config.js');

const app = express();

const compiler = webpack([clientConfig, serverConfig]);

compiler.apply(new FriendlyErrorsWebpackPlugin());

app.use(api);

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}));
app.use(
  webpackHotMiddleware(
    compiler.compilers.find(c => c.name === 'client'),
    {
      log: () => {}
    }
  )
);
app.use(webpackHotServerMiddleware(compiler));


const server = app.listen(6060, () => {
  server.keepAliveTimeout = 0;
});
