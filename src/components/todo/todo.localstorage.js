import angular from 'angular';

export default function TodoLocalStorage($q) {
  const STORAGE_ID = 'todos-angularjs';

  const store = {
    todos: [],

    _getFromLocalStorage() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    _saveToLocalStorage(todos) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    },

    clearCompleted() {
      const deferred = $q.defer();

      const incompleteTodos = store.todos.filter((todo) => !todo.completed);

      angular.copy(incompleteTodos, store.todos);

      store._saveToLocalStorage(store.todos);
      deferred.resolve(store.todos);

      return deferred.promise;
    },

    delete(todo) {
      const deferred = $q.defer();

      store.todos.splice(store.todos.indexOf(todo), 1);

      store._saveToLocalStorage(store.todos);
      deferred.resolve(store.todos);

      return deferred.promise;
    },

    get() {
      const deferred = $q.defer();

      angular.copy(store._getFromLocalStorage(), store.todos);
      deferred.resolve(store.todos);

      return deferred.promise;
    },

    insert(todo) {
      const deferred = $q.defer();

      store.todos.push(todo);

      store._saveToLocalStorage(store.todos);
      deferred.resolve(store.todos);

      return deferred.promise;
    },

    put(todo, index) {
      const deferred = $q.defer();

      store.todos[index] = todo;

      store._saveToLocalStorage(store.todos);
      deferred.resolve(store.todos);

      return deferred.promise;
    }
  };

  return store;
}
