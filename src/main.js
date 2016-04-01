/**
 * Main/entry module of the application.
 * You can bootstrap your application
 * and import any other modules from here.
 *
 * @module Main
 */

// Load environment exclusive logic bundles
import './main.development';
import './main.production';

import angular from 'angular';
import ngUIRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './main.config';

angular.module('main', [ngUIRouter, ngResource])
       .config(routing);
