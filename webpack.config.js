const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const configs = {
  development: require('./webpack/development.js'),
  staging: require('./webpack/staging.js'),
  production: require('./webpack/production.js')
};

const ENV = process.env.NODE_ENV;

function createCSSLoader() {
  const loaders =  [{
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      outputStyle: 'expanded',
      includePaths: [
        path.resolve(__dirname, 'src/styles')
      ]
    }
  }];
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: loaders
  });
}

const commonConfig = {
  name: 'client',
  target: 'web',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.jsx'),
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      use: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: createCSSLoader(),
    }]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          emitWarning: ENV === 'development',
          emitError: ENV === 'staging' || ENV === 'production'
        }
      }
    }),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '.stylelintrc'),
      files: '**/*.?(sa|sc|c)ss',
      context: path.join(__dirname, 'src'),
      emitErrors: ENV !== 'development'
    }),
    // new HtmlWebpackPlugin({
    //   title: 'hatch-react',
    //   template: path.join(__dirname, 'index.html'),
    //   inject: 'body',
    //   alwaysWriteToDisk: true
    // }),
    // new HtmlWebpackHarddiskPlugin()
  ]
};

const environmentConfig = (() => {
  switch (ENV) {
    case 'production':
      return configs.production;
    case 'staging':
      return configs.staging;
    case 'development':
    default:
      return configs.development;
  }
})();

module.exports = merge(commonConfig, environmentConfig);
