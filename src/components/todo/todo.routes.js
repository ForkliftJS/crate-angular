export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./todo.html'),
      controller: 'TodoController',
      controllerAs: 'TodoCtrl',
      resolve: {
        store(TodoStorage) {
          // Get the correct module (API or localStorage).
          return TodoStorage.then((module) => {
            // Fetch the todo records in the background.
            module.get();
            return module;
          });
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
