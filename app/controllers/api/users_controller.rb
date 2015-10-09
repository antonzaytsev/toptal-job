class Api::UsersController < Api::BaseController

  before_filter :authenticate_user!, except: [:create]

  def index
    users = User.all
    authorize users
    users = policy_scope(users)

    render json: ActiveModel::ArraySerializer.new(
        users,
        each_serializer: Api::UserSerializer
      )
  end

  def show
    user = User.find(params[:id])
    authorize user

    render json: Api::UserSerializer.new(user).to_json
  end

  def create
    user = User.new(create_params)
    return api_error(status: 422, errors: user.errors) unless user.valid?

    user.save!

    serializer = Api::UserSerializer.new(user)
    serializer.class._attributes << :token

    render(
      json: serializer.to_json,
      status: 201
    )
  end

  def update
    user = User.find(params[:id])
    authorize user

    user.attributes = create_params

    return api_error(status: 422, errors: user.errors) unless user.valid?

    user.save!

    render(
      json: Api::UserSerializer.new(user).to_json,
      status: 201
    )
  end

  def destroy
    user = User.find(params[:id])
    authorize user

    unless user.destroy
      return api_error(status: 500)
    end

    head status: 204
  end

  private

  def create_params
    params.require(:user).permit(
      :email, :password, :role
    ).delete_if{ |k,v| v.nil?}
  end

end