class ApiKey < ActiveRecord::Base

  before_create :generate_secret_key, :set_expiry_date
  belongs_to :user

  def generate_secret_key
    begin
      self.secret_key = ApiAuth.generate_secret_key
    end while self.class.exists?(secret_key: secret_key)
  end

end
