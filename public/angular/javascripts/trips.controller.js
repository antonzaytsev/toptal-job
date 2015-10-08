angular.module('app')
.controller('tripsController', function($scope, $http, $location, localStorageService) {

  $scope.trips = [];
  $scope.filter = 'upcoming';
  $scope.searchTripDestination = '';

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/trips',
    headers: {
      Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
    }
  }).then(function(response){
    console.log(response);
    $scope.trips = response.data.trips;
  }, function(response){
    if (response.status == 401) {
      $location.url('/login')
    }

    console.log(arguments);
  });

  $scope.deleteTrip = function(trip_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/trips/'+trip_id,
      headers: {
        Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
      }
    }).then(function(response){
      el = _.find($scope.trips, function(el){return el.id == trip_id;});
      index = _.indexOf($scope.trips, el);
      $scope.trips.splice(index, 1);

      alert('trip deleted!')
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }

  $scope.tripsFilter = function(value, index, array){
    if ($scope.filter == 'upcoming') {
      return new Date <= new Date(value.start_date);
    }
    else if ($scope.filter == 'past') {
      return new Date > new Date(value.start_date)
    }
    else {
      return true
    }
  };

  $scope.setFilter = function(f) {
    $scope.filter = f;
  }

});