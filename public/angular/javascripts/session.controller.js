angular.module('app')
.controller('sessionController', function($scope, $http, $location, localStorageService) {

  $scope.user = {};

  $scope.loginProcess = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/sessions',
      data: {
        user: $scope.user
      }
    }).then(function(response){
      localStorageService.set('email', response.data.email);
      localStorageService.set('token', response.data.token);
      localStorageService.set('role', response.data.role);
      $location.path('/')
    },function(response){
      //ngNotify.set('Email or password are wrong')
    });
  }

});