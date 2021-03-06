import angular from 'angular';

export default function TodoAPI($resource) {
  const store = {
    todos: [],

    api: $resource('/api/todos/:id', null,
      {
        update: { method: 'PUT' }
      }
    ),

    clearCompleted() {
      const originalTodos = store.todos.slice(0);

      const incompleteTodos = store.todos.filter(function (todo) {
        return !todo.completed;
      });

      angular.copy(incompleteTodos, store.todos);

      return store.api.delete(function () {
        }, function error() {
          angular.copy(originalTodos, store.todos);
        });
    },

    delete(todo) {
      var originalTodos = store.todos.slice(0);

      store.todos.splice(store.todos.indexOf(todo), 1);
      return store.api.delete({ id: todo.id },
        function () {
        }, function error() {
          angular.copy(originalTodos, store.todos);
        });
    },

    get() {
      return store.api.query(function (resp) {
        angular.copy(resp, store.todos);
      });
    },

    insert(todo) {
      var originalTodos = store.todos.slice(0);

      return store.api.save(todo,
        function success(resp) {
          todo.id = resp.id;
          store.todos.push(todo);
        }, function error() {
          angular.copy(originalTodos, store.todos);
        })
        .$promise;
    },

    put(todo) {
      return store.api.update({ id: todo.id }, todo)
        .$promise;
    }
  };

  return store;
}
