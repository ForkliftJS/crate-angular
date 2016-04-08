/**
 * Logic exclusive to the `development` environment.
 *
 * @module Main
 * @submodule Development
 * @main Main
 */

/**
* Adds webpack HMR support. It act's like livereload,
* reloading page after webpack rebuilt modules.
* It also updates stylesheets and inline assets without page reloading.
*/
function addWebpackHMRSupport() {
  if (module.hot) {
    module.hot.accept();
  }

  require('raw!./index.html');
}

/**
 * Runs all logic exclusive to the `development` environment.
 */
function initDevelopmentEnvironment() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  addWebpackHMRSupport();

  // Add calls to `development` exclusive functions here.
}

initDevelopmentEnvironment();
