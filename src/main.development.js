/**
 * Logic exclusive to the `development` environment.
 *
 * @module Main
 * @submodule Development
 * @main Main
 */

/**
 * Runs all logic exclusive to the `development` environment.
 */
function initDevelopmentEnvironment() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  require('forkliftjs').initDevelopmentEnvironment();

  // Add calls to `development` exclusive functions here.
}

initDevelopmentEnvironment();
