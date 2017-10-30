const webpack = require('webpack');
const path = require('path');

const ENV = process.env.NODE_ENV;

const sConfig = {
  name: 'server',
  target: 'node',
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'server.js',
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
    },{
      test: /\.scss$/,
      use: [{
        loader: 'css-loader/locals',
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, 'src/styles')
          ]
        }
      }]
    }]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   test: /\.jsx?$/,
    //   options: {
    //     eslint: {
    //       emitWarning: ENV === 'development',
    //       emitError: ENV === 'staging' || ENV === 'production'
    //     }
    //   }
    // }),
    // new StyleLintPlugin({
    //   configFile: path.join(__dirname, '.stylelintrc'),
    //   files: '**/*.?(sa|sc|c)ss',
    //   context: path.join(__dirname, 'src'),
    //   emitErrors: ENV !== 'development'
    // }),
  ]
};

module.exports = sConfig;
