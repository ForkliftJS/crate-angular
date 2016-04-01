/**
 * Logic exclusive to the `production` environment.
 *
 * @module Main
 * @submodule Production
 * @main Main
 */

/**
 * Runs all logic exclusive to the `production` environment.
 */
function initProductionEnvironment() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  require('forkliftjs').initProductionEnvironment();

  // Add calls to `production` exclusive functions here.
}

initProductionEnvironment();
