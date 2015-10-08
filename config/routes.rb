Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :sessions, only: [:create]
    resources :trips
  end

end
