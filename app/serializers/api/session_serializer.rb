class Api::SessionSerializer < Api::BaseSerializer

  attributes :email, :token

  def token
    object.authentication_token
  end

end