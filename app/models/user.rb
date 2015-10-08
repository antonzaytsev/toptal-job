class User < ActiveRecord::Base
  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  # include DeviseTokenAuth::Concerns::User

  # has_many :trips

  # before_save :ensure_api_key
  # has_many :api_keys

  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true
  validates :email, presence: true, length: { maximum: 255 }, format: { with: /@/ }, uniqueness: { case_sensitive: false }

  before_create :generate_authentication_token

  def generate_authentication_token
    loop do
      self.authentication_token = SecureRandom.base64(64)
      break unless User.find_by(authentication_token: authentication_token)
    end
  end

  # def find_api_key
  #   self.api_keys.active.first_or_create
  # end

end
