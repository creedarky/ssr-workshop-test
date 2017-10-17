const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../webpack.config.js');
const serverConfig = require('../webpack.server.config.js');
const app = express();

const compiler = webpack([clientConfig, serverConfig]);

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}));
app.use(webpackHotServerMiddleware(compiler));

app.listen(6060);
