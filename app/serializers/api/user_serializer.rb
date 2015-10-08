class Api::UserSerializer < Api::BaseSerializer

  attributes :id, :email, :role, :created_at, :updated_at

  def token
    object.authentication_token
  end

end