angular.module('app')
.controller('mainController', function($scope, $location, localStorageService) {
  $scope.email = function() {
    return localStorageService.get('email');
  }
  $scope.logout = function(){
    localStorageService.remove('token');
    localStorageService.remove('email');
    //ngNotify.set('You logged out successfully!');
    $location.path('/login')
  };

  $scope.isGuest = function(){
    return !localStorageService.get('email');
  };

  $scope.isAuthenticated = function(){
    return !!localStorageService.get('email');
  };

  $scope.canSeeUsers = function(){
    var role = localStorageService.get('role')
    return role == 'manager' || role == 'admin'
  }
});