angular.module('app')
.controller('tripEditController', function($scope, $http, $location, $routeParams, localStorageService) {
  $scope.trip = {};

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/trips/'+$routeParams.trip_id,
    headers: {
      Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
    }
  }).then(function(response){
    console.log(response);
    $scope.trip = response.data.trip
  });

  $scope.updateTrip = function(){
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/api/trips/'+$scope.trip.id,
      headers: {
        Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
      },
      data: {
        trip: $scope.trip
      }
    }).then(function(response){
      console.log(response);
      $location.url('/trips');
      //$scope.todos = res.data;
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }
});