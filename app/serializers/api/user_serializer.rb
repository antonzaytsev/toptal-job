class Api::UserSerializer < Api::BaseSerializer

  attributes :id, :email, :role, :created_at, :updated_at

end