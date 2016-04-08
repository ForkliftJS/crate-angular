/* eslint-disable no-param-reassign */
import angular from 'angular';

export default class TodoController {
  constructor($scope, $state, $filter, store) {
    // Injected dependencies
    this.$state = $state;
    this.$filter = $filter;
    this.store = store;

    // Properties
    this.todos = store.todos;
    this.newTodo = '';
    this.editedTodo = null;

    $scope.$watch(() => this.todos, this.onTodosChange.bind(this), true);
    $scope.$on('$routeChangeSuccess', this.onStateChange.bind(this));
  }

  onTodosChange() {
    this.remainingCount = this.$filter('filter')(this.todos, { completed: false }).length;
    this.completedCount = this.todos.length - this.remainingCount;
    this.allChecked = !this.remainingCount;
  }

  /* FIXME: Catch status parameter */
  onStateChange() {
    this.status = this.$state.params.status || '';
    this.statusFilter = {};

    if (this.status === 'active') {
      this.statusFilter = { completed: false };
    } else if (this.status === 'completed') {
      this.statusFilter = { completed: true };
    }
  }

  addTodo() {
    const newTodo = {
      title: this.newTodo.trim(),
      completed: false
    };

    if (!newTodo.title) {
      return;
    }

    this.saving = true;
    this.store.insert(newTodo)
      .then(() => {
        this.newTodo = '';
      })
      .finally(() => {
        this.saving = false;
      });
  }

  editTodo(todo) {
    this.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    this.originalTodo = angular.extend({}, todo);
  }

  saveEdits(todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && this.saveEvent === 'submit') {
      this.saveEvent = null;
      return;
    }

    this.saveEvent = event;

    if (this.reverted) {
      // Todo edits were reverted-- don't save.
      this.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === this.originalTodo.title) {
      this.editedTodo = null;
      return;
    }

    this.store[todo.title ? 'put' : 'delete'](todo)
      .then(() => {}, () => {
        todo.title = this.originalTodo.title;
      })
      .finally(() => {
        this.editedTodo = null;
      });
  }

  revertEdits(todo) {
    this.todos[this.todos.indexOf(todo)] = this.originalTodo;
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }

  removeTodo(todo) {
    this.store.delete(todo);
  }

  saveTodo(todo) {
    this.store.put(todo);
  }

  toggleCompleted(todo, completed) {
    if (completed) {
      todo.completed = completed;
    }

    this.store.put(todo, this.todos.indexOf(todo))
      .then(() => {}, () => {
        todo.completed = !todo.completed;
      });
  }

  clearCompletedTodos() {
    this.store.clearCompleted();
  }

  markAll(completed) {
    this.todos.forEach((todo) => {
      if (todo.completed !== completed) {
        this.toggleCompleted(todo, completed);
      }
    });
  }
}

TodoController.inject = ['$scope', '$state', '$filter', 'store'];

// export default function TodoController($scope, $state, $filter, store) {
//   const todos = $scope.todos = store.todos;
//
//   $scope.newTodo = '';
//   $scope.editedTodo = null;
//
//   $scope.$watch(('todos'), () => {
//     $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
//     $scope.completedCount = todos.length - $scope.remainingCount;
//     $scope.allChecked = !$scope.remainingCount;
//   }, true);
//
//   // Monitor the current route for changes and adjust the filter accordingly.
//   $scope.$on('$routeChangeSuccess', () => {
//     const status = $scope.status = $state.params.status || '';
//     let statusFilter;
//
//     switch (status) {
//       case 'active':
//         statusFilter = { completed: false };
//         break;
//
//       case 'completed':
//         statusFilter = { completed: true };
//         break;
//
//       default:
//         statusFilter = {};
//     }
//
//     $scope.statusFilter = statusFilter;
//   });
//
//   $scope.addTodo = function () {
//     const newTodo = {
//       title: $scope.newTodo.trim(),
//       completed: false
//     };
//
//     if (!newTodo.title) {
//       return;
//     }
//
//     $scope.saving = true;
//     store.insert(newTodo)
//       .then(() => {
//         $scope.newTodo = '';
//       })
//       .finally(() => {
//         $scope.saving = false;
//       });
//   };
//
//   $scope.editTodo = function (todo) {
//     $scope.editedTodo = todo;
//     // Clone the original todo to restore it on demand.
//     $scope.originalTodo = angular.extend({}, todo);
//   };
//
//   $scope.saveEdits = function (todo, event) {
//     // Blur events are automatically triggered after the form submit event.
//     // This does some unfortunate logic handling to prevent saving twice.
//     if (event === 'blur' && $scope.saveEvent === 'submit') {
//       $scope.saveEvent = null;
//       return;
//     }
//
//     $scope.saveEvent = event;
//
//     if ($scope.reverted) {
//       // Todo edits were reverted-- don't save.
//       $scope.reverted = null;
//       return;
//     }
//
//     todo.title = todo.title.trim();
//
//     if (todo.title === $scope.originalTodo.title) {
//       $scope.editedTodo = null;
//       return;
//     }
//
//     store[todo.title ? 'put' : 'delete'](todo)
//       .then(() => {}, () => {
//         todo.title = $scope.originalTodo.title;
//       })
//       .finally(() => {
//         $scope.editedTodo = null;
//       });
//   };
//
//   $scope.revertEdits = function (todo) {
//     todos[todos.indexOf(todo)] = $scope.originalTodo;
//     $scope.editedTodo = null;
//     $scope.originalTodo = null;
//     $scope.reverted = true;
//   };
//
//   $scope.removeTodo = function (todo) {
//     store.delete(todo);
//   };
//
//   $scope.saveTodo = function (todo) {
//     store.put(todo);
//   };
//
//   $scope.toggleCompleted = function (todo, completed) {
//     if (angular.isDefined(completed)) {
//       todo.completed = completed;
//     }
//     store.put(todo, todos.indexOf(todo))
//       .then(() => {}, () => {
//         todo.completed = !todo.completed;
//       });
//   };
//
//   $scope.clearCompletedTodos = function () {
//     store.clearCompleted();
//   };
//
//   $scope.markAll = function (completed) {
//     todos.forEach((todo) => {
//       if (todo.completed !== completed) {
//         $scope.toggleCompleted(todo, completed);
//       }
//     });
//   };
// }
