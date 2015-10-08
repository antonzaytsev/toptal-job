angular.module('app')
.controller('userNewController', function($scope, $http, localStorageService) {

  $scope.email = '';
  $scope.password = '';

  $scope.registerProcess = function(){
    $http.post('http://localhost:3000/api/users', {
      'user': {
        email: $scope.email,
        password: $scope.password
      }
    }).then(function(response) {
      user = response.data.user;
      localStorageService.set('email', user.email);
      localStorageService.set('token', user.token);
      localStorageService.set('role', user.role);
      alert('Account created')
    }, function(response){
      alert('Email or password are incorrect')
    })
  }

});