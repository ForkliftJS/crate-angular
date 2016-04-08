/* eslint-disable no-var */
var path = require('path'); // eslint-disable-line no-unused-vars

module.exports = {
  crate: 'angular',
  vendorAliases: {
    // EXAMPLE:
    //   jquery: path.join('bower', 'jquery', 'dist', 'jquery.js'),
    //   bootstrapStyles: path.join('bower', 'bootstrap', 'dist', 'css', 'bootstrap.css'),
    //
    // BEFORE ALIAS:
    //   import $ from './vendor/bower/jquery/dist/jquery.js';
    //
    // AFTER ALIAS:
    //   import $ from 'jquery';
  },

  // OPTIONS BELOW ARE NOT YET IMPLEMENTED
  sourceFolder: './src',
  distributionFolder: './dist',
  mainModules: ['./src/main'],
  mainTemplate: './src/index.html'
};
/* eslint-enable no-var */
