class Api::TripSerializer < Api::BaseSerializer

  attributes :id, :author_id, :destination, :start_date, :end_date, :comment, :created_at, :updated_at

end