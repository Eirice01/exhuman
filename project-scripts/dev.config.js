/*
 * Created on Mon Nov 28 2018
 * Authored by zonebond
 * @github - github.com/zonebond
 * @e-mail - zonebond@126.com
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { name } = require('../package.json');
const { ROOT } = require('./tools');
const { CONFIG, _src, _mocks } = require('./config-common');

const entry = { app: ROOT('src', 'index.js') };

const devServer = {
  host: '0.0.0.0',
  open: false,
  progress: true,
  compress: false,
  stats: 'errors-only',
  port: 3001,
  disableHostCheck: true,
  contentBase: [_src, _mocks],
  proxy: {

  }
};
const plugins = origin => [
  new webpack.EnvironmentPlugin({
    USE_MOCK_SERVICE: true
  }),
  ...origin,
  new HtmlWebpackPlugin({
    title: name,
    template: ROOT('public', 'index.html'),
    inject: 'body',
    chunks: ['app']
  })
];

const configs = CONFIG({
  mode: 'development',
  entry,
  devtool: "source-map",
  target: 'web',
  node:{fs:"empty"},
  devServer,
  plugins
});

// console.log(configs);

module.exports = configs;
