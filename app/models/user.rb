class User < ActiveRecord::Base

  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true
  validates :email, presence: true, length: { maximum: 255 }, format: { with: /@/ }, uniqueness: { case_sensitive: false }

  has_many :trips

  before_create :generate_authentication_token

  def generate_authentication_token
    loop do
      self.authentication_token = SecureRandom.base64(64)
      break unless User.find_by(authentication_token: authentication_token)
    end
  end

end
