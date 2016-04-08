import angular from 'angular';
import ngUIRouter from 'angular-ui-router';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base';

import routes from './todo.routes';
import TodoController from './todo.controller';
import TodoAPI from './todo.api';
import TodoLocalStorage from './todo.localstorage';
import TodoStorage from './todo.storage';
import todoFocus from './todo.focus';
import todoEscape from './todo.escape';

export default angular.module('todo', [ngUIRouter])
  .config(routes)
  .factory('TodoAPI', TodoAPI)
  .factory('TodoStorage', TodoStorage)
  .factory('TodoLocalStorage', TodoLocalStorage)
  .directive('todoFocus', todoFocus)
  .directive('todoEscape', todoEscape)
  .controller('TodoController', TodoController)
  .name;
