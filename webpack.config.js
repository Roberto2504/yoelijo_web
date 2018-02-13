var path = require('path');
var webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:2504',
    'webpack/hot/only-dev-server',
    './app/app',
  ],
  output: {
    publicPath: '/',
    filename: 'main.js'
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    })
  ],
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'app'),
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      { test : /\.css$/, loader : 'style!css' },
      { test : /\.(png|jpg|gif)$/, loader : 'url?limit=125000' },
      { test : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
    ]
  },
  worker: {
    output: {
      filename: 'hash.worker.js',
      chunkFilename: '[id].hash.worker.js'
    }
  },
  devServer: {
    contentBase: "./app"
  }
};
