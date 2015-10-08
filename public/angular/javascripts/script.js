
// create the module and name it scotchApp
var app = angular.module('travelPlannerApp', ['ngRoute', 'LocalStorageModule']);

 //configure our routes
app.config(['$routeProvider', function($routerProvider) {

  $routerProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    })

    .when('/trips/new', {
      templateUrl : 'pages/trips/new.html',
      controller  : 'tripCreateController'
    })

    // route for the home page
    .when('/trips', {
      templateUrl : 'pages/trips/index.html',
      controller  : 'tripsController'
    })

    .when('/trips/:trip_id', {
      templateUrl : 'pages/trips/show.html',
      controller  : 'tripController'
    })

    .when('/trips/:trip_id/edit', {
      templateUrl : 'pages/trips/edit.html',
      controller  : 'tripEditController'
    })

    .when('/login', {
      templateUrl : 'pages/login.html',
      controller  : 'loginController'
    })

    .when('/register', {
      templateUrl : 'pages/register.html',
      controller  : 'registerController'
    })

}]);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('travelPlannerApp');
});

app.controller('mainController', function($scope) {
  // create a message to display in our view
  $scope.message = 'mainController!';
});

app.controller('tripsController', function($scope, $http, $location, localStorageService) {

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

app.controller('tripEditController', function($scope, $http, $location, $routeParams, localStorageService) {
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

app.controller('tripCreateController', function($scope, $http, $location, localStorageService) {
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
      //$scope.todos = res.data;
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }
});

app.controller('loginController', function($scope, $http) {

  $scope.loginProcess = function(){
    $http.post('http://localhost:3000/api/trips')
    alert(1);
  }

});

app.controller('registerController', function($scope, $http, localStorageService) {

  console.log();

  $scope.email = '';
  $scope.password = '';

  $scope.registerProcess = function(){
    $http.post('http://localhost:3000/api/users', {
      'user': {
        email: $scope.email,
        password: $scope.password
      }
    }).then(function(response){
      user = response.data.user;
      localStorageService.set('email', user.email);
      localStorageService.set('token', user.token);
      alert('Account created')
    }, function(response){
      alert('Email or password are incorrect')
    })
  }

});

app.directive('back', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind('click', function () {
        $window.history.back();
      });
    }
  };
}]);