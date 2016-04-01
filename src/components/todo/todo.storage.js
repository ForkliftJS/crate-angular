/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
export default function TodoStorage($http, $injector) {
  // Detect if an API backend is present. If so, return the API module, else
  // hand off the localStorage adapter
  return $http.get('/api')
    .then(
      () => $injector.get('TodoAPI'),
      () => $injector.get('TodoLocalStorage'));
}
