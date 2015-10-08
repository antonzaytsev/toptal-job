angular.module "travelPlannerApi"
.controller "TripsController", ($timeout, webDevTec, toastr) ->
  Trip.query().then (trips) -> $scope.trips = trips
