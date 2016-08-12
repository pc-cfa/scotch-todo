 /*jshint esversion: 6 */

angular.module('scotch-todo')

.controller('main', function ($scope, $ionicModal, $ionicLoading, localStorageService, remoteStorageService) { 
  
  //store the entities name in a variable var taskData = 'task';
  var taskData = 'task';

  //initialize the tasks scope with empty array
  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });

///////////////////////////////////////////////////////////////////////////////
  $scope.getTasks = function () {
        //fetches task from local storage

        // if (localStorageService.get(taskData)) {
        //     $scope.tasks = localStorageService.get(taskData);  //TODO API INTERACTION HERE
        // } else {
        //     $scope.tasks = [];
        // }

        $ionicLoading.show();

        remoteStorageService.getTodos()
            .then(function(response){
                $scope.tasks = response.data.todos;
            })
            .catch(function(response){
                //request was not successful, handle the error
                $scope.tasks = [];
            })
            .finally(function(){
                $ionicLoading.hide();
            });

   }

///////////////////////////////////////////////////////////////////////////////
  $scope.createTask = function () {
          //creates a new task
        //   $scope.tasks.push($scope.task);

        //   localStorageService.set(taskData, $scope.tasks); //TODO API INTERACTION HERE
        $scope.task.resourceUrl = "";
        $scope.task.state       = 0;
        $scope.task.author      = "userAAA";
        
        $ionicLoading.show();

        remoteStorageService.postTodo($scope.task)
            .then(function(response){
                $scope.task = response.data.todo;

                $scope.tasks.push($scope.task);

                $scope.task = {};
                //close new task modal
                $scope.newTaskModal.hide();
            })
            .catch(function(response){
                //request was not successful, handle the error
            })
            .finally(function(){
                $ionicLoading.hide();
            });

   }

///////////////////////////////////////////////////////////////////////////////
  $scope.removeTask = function (index) {
        //removes a task
        // $scope.tasks.splice(index, 1);

        // localStorageService.set(taskData, $scope.tasks);  //TODO API INTERACTION HERE

        if ((index >= 0) && (index < $scope.tasks.length)) {
          $scope.task = $scope.tasks[index]; 

          $ionicLoading.show();

          remoteStorageService.deleteTodo($scope.task._id)
              .then(function(response){
                  $scope.tasks.splice(index, 1);
              })
              .catch(function(response){
                  //request was not successful, handle the error
              })
              .finally(function(){
                  $ionicLoading.hide();
              });
        } //if ((index >= 0) && (index < $scope.tasks.length))
     }

///////////////////////////////////////////////////////////////////////////////
  $scope.completeTask = function (index) { 
    //updates a task as completed 

    // $scope.tasks[index].completed = true;
    // 
    // localStorageService.set(taskData, $scope.tasks);  //TODO API INTERACTION HERE

    if ((index >= 0) && (index < $scope.tasks.length)) {
      $scope.task = $scope.tasks[index]; 

        $ionicLoading.show();

        remoteStorageService.patchTodo($scope.task._id, { state: 1 })
            .then(function(response){
                $scope.task.completed = true; 
            })
            .catch(function(response){
                //request was not successful, handle the error
            })
            .finally(function(){
                $ionicLoading.hide();
            });

    } // if ((index >= 0) && (index < $scope.tasks.length))
  }

///////////////////////////////////////////////////////////////////////////////
  $scope.openTaskModal = function () {
    $scope.newTaskModal.show();
  };

///////////////////////////////////////////////////////////////////////////////
  $scope.closeTaskModal = function () {
    $scope.newTaskModal.hide();
  };  

}); // app.controller('main', function ($scope, $ionicModal, localStorageService)
///////////////////////////////////////////////////////////////////////////////
