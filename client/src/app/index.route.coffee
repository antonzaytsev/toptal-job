angular.module "travelPlannerApi"
  .config ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $stateProvider
      .state "home",
        url: "/"
        templateUrl: "app/main/main.html"
        controller: "MainController"
        controllerAs: "main"
      .state 'sign_in',
        url: '/sign_in'
        templateUrl: 'app/user_sessions/sign_in.html',
        controller: 'UserSessionsController'
#      .state 'trips',
#        url: '/trips'
#        templateUrl: 'app/trips/index.html',
#        controller: 'TripsController'
#      .state 'trips_new',
#        url: '/trips/new'
#        templateUrl: 'app/trips/new.html',
#        controller: 'TripsController'

    $urlRouterProvider.otherwise '/'
    $locationProvider.html5Mode({enabled: true, requireBase: false})
