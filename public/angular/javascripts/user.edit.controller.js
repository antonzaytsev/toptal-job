angular.module('app')
.controller('userEditController', function($scope, $http, $location, $routeParams, localStorageService){
  $scope.user = {};

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/'+$routeParams.user_id,
    headers: {
      Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
    }
  }).then(function(response){
    console.log(response);
    $scope.user = response.data.user;
    console.log($scope.user);
  }, function(response) {
    if (response.status == 401) {
      $location.url('/login')
    }

    console.log(arguments);
  });

  $scope.updateUser = function(){
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/api/users/'+$scope.user.id,
      headers: {
        Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
      },
      data: {
        user: $scope.user
      }
    }).then(function(response){
      alert('User updated!')
      $location.url('/users');
    }, function(response){
      alert('There is a problem with user update')
    })
  }
});