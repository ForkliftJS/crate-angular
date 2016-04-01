routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./todo.html'),
      controller: 'TodoController',
      controllerAs: 'todoCtrl',
      resolve: {
        store(todoStorage) {
          // Get the correct module (API or localStorage).
          return todoStorage.then((module) => {
            // Fetch the todo records in the background.
            module.get();
            return module;
          });
        }
      }
    });
}
