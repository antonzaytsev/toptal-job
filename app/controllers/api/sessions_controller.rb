class Api::SessionsController < Api::BaseController

  before_filter :authenticate_user!, except: [:create]

  def create
    user = User.find_by(email: create_params[:email])
    if user && user.authenticate(create_params[:password])
      self.current_user = user
      render(
        json: Api::SessionSerializer.new(user, root: false).to_json,
        status: 201
      )
    else
      return api_error(status: 401)
    end
  end

  private
  def create_params
    params.require(:user).permit(:email, :password)
  end

end