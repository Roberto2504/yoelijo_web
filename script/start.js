/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
process.env.NODE_ENV = 'development';


require('dotenv').config({silent : true});

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const httpProxyMiddleware = require('http-proxy-middleware');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = process.env.PORT || 80;
let compiler;
let handleCompile;

function setupCompiler (host, port, protocol) {
  compiler = webpack(config, handleCompile);
  compiler.plugin('invalid', function invalidPlugin () {
    clearConsole();
    console.log('Compiling...');
  });

  compiler.plugin('done', function pluginDone (stats) {
    clearConsole();

    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('TAVUEL 506 WEB PACK: Compiled successfully!'));
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('TAVUEL 506 WEB PACK: To create a production build, use ' + chalk.cyan('npm run build') + '.');
      console.log();
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
    }
  });
}

function onProxyError (proxy) {
  return function onError (err, req, res) {
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    console.log();

    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    );
  };
}

function addMiddleware (devServer) {
  const proxy = devServer.proxy;
  devServer.use(historyApiFallback({
    disableDotRule    : true,
    htmlAcceptHeaders : proxy ?
      ['text/html'] :
      ['text/html', '*/*'],
  }));

  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
      console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
      console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
      process.exit(1);
    }

    const mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
    devServer.use(mayProxy,
      httpProxyMiddleware(pathname => mayProxy.test(pathname), {
        target       : proxy,
        logLevel     : 'silent',
        onError      : onProxyError(proxy),
        secure       : false,
        changeOrigin : true,
      })
    );
  }

  devServer.use(devServer.middleware);
}

function runDevServer (host, port, protocol) {
  const devServer = new WebpackDevServer(compiler, {

    clientLogLevel : 'none',
    contentBase    : paths.appPublic,
    hot            : true,
    publicPath     : config.output.publicPath,
    quiet          : true,
    watchOptions   : {
      ignored : /node_modules/,
    },
    https            : protocol === 'https',
    host             : host,
    disableHostCheck : true,
    proxy            : {
      '/scorms/**' : {
        target       : `${process.env.AWS_CLOUDFRONT_URL}/scorms`,
        secure       : false,
        changeOrigin : true,
        pathRewrite  : { '^/scorms' : '' },
      },
    },
  });

  addMiddleware(devServer);

  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    clearConsole();
    console.log(chalk.cyan('DNAMIC WEBPACK: Starting the development server...'));
    console.log();
    openBrowser(protocol + '://' + host + ':' + port + '/');
    return '';
  });
}

function run (port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  // runDevServer(host, port, protocol);
}

run(DEFAULT_PORT);
