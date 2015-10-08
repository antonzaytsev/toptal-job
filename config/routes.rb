Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:index, :show, :create, :update]
    resources :sessions, only: [:create]
    resources :trips
  end

end
