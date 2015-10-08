class Api::SessionSerializer < Api::BaseSerializer

  attributes :id, :email, :token

  def token
    object.authentication_token
  end

end