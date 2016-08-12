/*jshint esversion: 6 */

angular.module('scotch-todo')

.factory('remoteStorageService', function($http) {
    var dataSource = 'http://localhost:3000/api/todos';

    // 'API todo Root - available routes are',
    //
    // 'POST   api/todos     - create a new todo',
    // 'GET    api/todos     - get all available todos',
    // 'GET    api/todos/:id - get a specified todo',
    // 'PUT    api/todos/:id - update a specified todo',
    // 'PATCH  api/todos/:id - alter a specified todo',
    // 'DELETE api/todos/:id - delete a specified todo',
    //
    // 'all params to be supplied in body / x-www-form-urlencoded' 


    return {
        postTodo: function(Todo) {
            return $http.post(dataSource, Todo);
        },
        getTodos: function() {
            return $http.get(dataSource);
        },
        getTodo: function(TodoId) {
            return $http.get(dataSource + '/' + TodoId);
        },
        putTodo: function(Todo) {
            return $http.put(dataSource + '/' + Todo._id, Todo);
        },
        patchTodo: function(TodoId, params) {
            return $http.patch(dataSource + '/' + TodoId, params);
        },
        deleteTodo: function(TodoId) {
            return $http.delete(dataSource + '/' + TodoId);
        }
    }
});