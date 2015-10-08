class Api::SessionSerializer < Api::BaseSerializer

  attributes :email, :token, :role

  def token
    object.authentication_token
  end

end