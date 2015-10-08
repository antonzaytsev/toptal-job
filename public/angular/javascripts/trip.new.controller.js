angular.module('app')
.controller('tripNewController', function($scope, $http, $location, localStorageService) {
  $scope.trip = {};

  $scope.createTrip = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/trips',
      headers: {
        Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
      },
      data: {
        trip: $scope.trip
      }
    }).then(function(response){
      console.log(response);
      $location.url('/trips');
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }
});