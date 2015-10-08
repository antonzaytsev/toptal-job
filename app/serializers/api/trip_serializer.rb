class Api::TripSerializer < Api::BaseSerializer

  attributes :id, :author_id, :destination, :start_date, :end_date, :comment, :created_at, :updated_at, :days_to_trip

  def days_to_trip
    tn = Time.now
    if object.start_date >= tn.to_date
      ((object.start_date.to_time - tn) / 60 / 60 / 24).to_i
    end
  end

end