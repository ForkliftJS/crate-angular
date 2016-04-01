import angular from 'angular';
import ngUIRouter from 'angular-ui-router';

import routing from './todo.routes';
import TodoController from './todo.controller';
import TodoFocus from './todo.focus';
import TodoEscape from './todo.escape';
import TodoAPI from './todo.api';
import TodoLocalStorage from './todo.localstorage';
import TodoStorage from './todo.storage';

export default angular.module('todo', [ngUIRouter])
  .config(routing)
  .factory('TodoAPI', TodoAPI)
  .factory('TodoStorage', TodoStorage)
  .factory('TodoLocalStorage', TodoLocalStorage)
  .directive('TodoFocus', TodoFocus)
  .directive('TodoEscape', TodoEscape)
  .controller('TodoController', TodoController)
  .name;
