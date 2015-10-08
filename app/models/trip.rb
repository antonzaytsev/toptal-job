class Trip < ActiveRecord::Base

  belongs_to :author, class_name: 'User'

  validates :author_id, presence: true
  validates :destination, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  validate :validate_start_date_before_end_date

  # scope :upcoming, -> { where('start_date >= ?', Time.now.to_date) }
  # scope :past, -> { where('start_date < ?', Time.now.to_date) }

  def validate_start_date_before_end_date
    if end_date && start_date
      errors.add(:end_date, "End date should be same as start or in future") if end_date < start_date
    end
  end

end
