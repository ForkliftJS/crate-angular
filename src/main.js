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

// Angular dependencies
import angular from 'angular';
import ngUIRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

// Main routing configuration
import routing from './main.routing';

// Components
import TodoComponent from './components/todo';

angular.module('main', [ngUIRouter, ngResource, TodoComponent])
       .config(routing);
