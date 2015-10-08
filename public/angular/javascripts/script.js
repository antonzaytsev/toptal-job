
// create the module and name it scotchApp
var app = angular.module('travelPlannerApp', ['ngRoute', 'LocalStorageModule', 'ngNotify']);

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
      templateUrl : 'pages/sessions/new.html',
      controller  : 'sessionController'
    })

    .when('/register', {
      templateUrl : 'pages/users/new.html',
      controller  : 'userNewController'
    })

    .when('/users', {
      templateUrl : 'pages/users/index.html',
      controller :  'usersController'
    })

    .when('/users/:user_id', {
      templateUrl : 'pages/users/show.html',
      controller :  'userController'
    })

    .when('/users/:user_id/edit', {
      templateUrl : 'pages/users/edit.html',
      controller :  'userEditController'
    })

}]);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('travelPlannerApp');
});

app.controller('mainController', function($scope, $location, localStorageService) {
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
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }
});

app.controller('sessionController', function($scope, $http, $location, localStorageService) {

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

app.controller('userNewController', function($scope, $http, localStorageService) {

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

app.controller('usersController', function($scope, $http, localStorageService){

  $scope.users = [];

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users',
    headers: {
      Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
    }
  }).then(function(response){
    console.log(response);
    $scope.users = response.data.users;
  }, function(response){
    if (response.status == 401) {
      $location.url('/login')
    }

    console.log(arguments);
  });


  $scope.deleteUser = function(user_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/users/'+user_id,
      headers: {
        Authorization: 'Token token="'+localStorageService.get('token')+'", email="'+localStorageService.get('email')+'"'
      }
    }).then(function(response){
      el = _.find($scope.users, function(el){return el.id == user_id;});
      index = _.indexOf($scope.users, el);
      $scope.users.splice(index, 1);

      alert('User deleted!')
    }, function(response){
      if (response.status == 401) {
        $location.url('/login')
      }

      console.log(arguments);
    });
  }

});

app.controller('userEditController', function($scope, $http, $location, $routeParams, localStorageService){
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