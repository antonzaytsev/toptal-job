angular.module "TravelPlannerApi"
  .factory "Trip", (RailsResource) ->
    class Trip extends RailsResource
      @configure url: "/api/trips", name: "trip"
