const path = require('path');
const fontLoader = require('./fontLoader');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const paths = require('./paths');

const publicPath = '/';

const publicUrl = '';

const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'eval',
  context: paths.appIndexJs,
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    'react-hot-loader/patch',
    require.resolve('./polyfills'),
    paths.appIndexJs,
  ],
  output: {
    path       : paths.appBuild,
    pathinfo   : true,
    filename   : 'static/js/bundle.js',
    publicPath : publicPath,
  },
  resolve : {
    modules    : ['node_modules'],
    extensions : ['.js', '.json', '.jsx'],
    alias      : {
      'react-native' : 'react-native-web',
    },
  },
  module : {
    rules : [
      {
        test    : /\.(js|jsx)$/,
        enforce : 'pre',
        loader  : 'eslint-loader',
        include : paths.appSrc,
      },
      {
        test : /\.css$/,
        use  : [ 'style-loader', 'css-loader' ],
      },
      {
        test    : /\.(js|jsx)$/,
        include : paths.appSrc,
        loader  : 'babel-loader',
        options : {
          cacheDirectory : findCacheDir({
            name : 'react-scripts',
          }),
          plugins : ['transform-decorators-legacy', 'lodash' ],
          presets : ['es2015', 'stage-0', 'react', 'flow'],
        },
      },
      {
        test   : /\.json$/,
        loader : 'json-loader',
      },
      {
        test    : /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader  : 'file-loader',
        options : {
          name : 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test    : /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader  : 'url-loader',
        options : {
          limit : 10000,
          name  : 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test    : /\.(graphql|gql)$/,
        include : paths.appSrc,
        exclude : /node_modules/,
        loader  : 'graphql-tag/loader',
      },
      // fontLoader.load('eot', 'application/vnd.ms-fontobject'),
      // fontLoader.load('svg', 'image/svg+xml'),
      // fontLoader.load('[ot]tf', 'application/octet-stream'),
      // fontLoader.load('woff', 'application/font-woff'),
      // fontLoader.load('woff2', 'woff2'),
    ],
  },
  plugins : [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new LodashModuleReplacementPlugin({
      'collections' : true,
      'shorthands'  : true,
      'flattening'  : true,
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL : publicUrl,
    }),
    new HtmlWebpackPlugin({
      inject   : true,
      template : paths.appHtml,
    }),
    new Dotenv({
      path : path.resolve(__dirname, '../', '.env'),
      safe : true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options : {
        context : __dirname,
        debug   : true,
        postcss : function post () {
          return [
            autoprefixer({
              browsers : [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
            }),
          ];
        },
      },
    }),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node : {
    fs  : 'empty',
    net : 'empty',
    tls : 'empty',
  },
};
