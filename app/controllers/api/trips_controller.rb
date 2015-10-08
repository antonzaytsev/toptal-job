class Api::TripsController < Api::BaseController
  def index
    trips = Trip.all.order(start_date: :asc)
    trips = policy_scope(trips)

    # if params[:filter] && params[:filter].in?(%w(upcoming past all))
    #   case params[:filter]
    #     when 'upcoming'
    #       trips = trips.upcoming
    #     when 'past'
    #       trips = trips.past
    #     else
    #       trips = trips.all
    #   end
    # end

    render json: ActiveModel::ArraySerializer.new(
        trips,
        each_serializer: Api::TripSerializer,
        root: 'trips',
      )
  end

  def show
    trip = Trip.find(params[:id])
    authorize trip
    render json: Api::TripSerializer.new(trip).to_json
  end

  def create
    trip = Trip.new(trip_params)
    trip.author_id = current_user.id
    return api_error(status: 422, errors: trip.errors) unless trip.valid?

    trip.save!

    render(
      json: Api::TripSerializer.new(trip).to_json,
      status: 201,
      # location: api_trip_path(trip.id)
    )
  end

  def update
    trip = Trip.find(params[:id])
    authorize trip

    trip.attributes = trip_params

    return api_error(status: 422, errors: trip.errors) unless trip.valid?

    trip.save!

    render(
      json: Api::TripSerializer.new(trip).to_json,
      status: 201,
      # location: api_trip_path(trip.id)
    )
  end

  def destroy
    trip = Trip.where(author: current_user.id).find(params[:id])
    authorize trip

    unless trip.destroy
      return api_error(status: 500)
    end

    head status: 204
  end

  private

    def trip_params
      params.require(:trip).permit(
        :destination, :start_date, :end_date, :comment
      ).delete_if{ |k,v| v.nil?}
    end
end
