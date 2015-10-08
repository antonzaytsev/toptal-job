class Trip < ActiveRecord::Base

  belongs_to :author, class_name: 'User'

  validates :author_id, presence: true
  validates :destination, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
