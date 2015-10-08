angular.module('app')
.config(['$routeProvider', function($routerProvider) {

  $routerProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    })

    .when('/trips/new', {
      templateUrl : 'pages/trips/new.html',
      controller  : 'tripNewController'
    })

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