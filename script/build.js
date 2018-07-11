/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config({ silent : true });

const chalk = require('chalk');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

rimraf(`${paths.appBuild}/*`, function run () {
  build();

  // Merge with the public folder
  copyPublicFolder();
});

// Print out errors
function printErrors (summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

// Create the production build and print the deployment instructions.
function build () {
  console.log('Creating an optimized production build...');
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();
  });
}

function copyPublicFolder () {
  return fs.copy(paths.appPublic, paths.appBuild, {
    dereference : true,
    filter      : file => file !== paths.appHtml,
  });
}
