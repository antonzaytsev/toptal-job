require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /users" do
    it 'should create new user' do
      email = 'test@mail.com'
      post api_users_path, {user: {email: email, password: '123123123'}}
      expect(response).to have_http_status(201)
      json = JSON.parse(response.body)
      expect(json['user']['email']).to eq email
      expect(json['user']['token']).to_not be_nil
      expect(User.where(email: email).size).to eq 1
    end
  end

  describe "GET /users" do
    it "should reject request for non authenticated user" do
      get api_users_path
      expect(response).to have_http_status(401)
    end

    it 'should not show list of users for normal user' do
      user = FactoryGirl.create :user
      get api_users_path, nil, {'Authorization' => 'Token token="'+user.authentication_token+'", email="'+user.email+'"'}
      expect(response).to have_http_status(403)
    end

    it 'should return list of users' do
      manager = FactoryGirl.create :user, role: :manager
      get api_users_path, nil, {'Authorization' => 'Token token="'+manager.authentication_token+'", email="'+manager.email+'"'}
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).size).to eq 1
    end
  end

  describe "PATCH /users/:id" do
    it 'should update user info' do
      manager = FactoryGirl.create :user, role: :manager
      user = FactoryGirl.create :user
      new_email = 'new@email.com'

      patch api_user_path(id: user.id), {user: { email: new_email}}, {'Authorization' => 'Token token="'+manager.authentication_token+'", email="'+manager.email+'"'}
      expect(response).to have_http_status(201)
      expect(User.find(user.id).email).to eq new_email
    end
  end

  describe "DELETE /users/:id" do
    it 'should delete user' do
      manager = FactoryGirl.create :user, role: :manager
      user = FactoryGirl.create :user

      delete api_user_path(id: user.id), nil, {'Authorization' => 'Token token="'+manager.authentication_token+'", email="'+manager.email+'"'}
      expect(response).to have_http_status(204)
      expect(User.where(email: user.email).size).to eq 0
    end

    it 'should not allow delete one user by another' do
      user1 = FactoryGirl.create :user
      user2 = FactoryGirl.create :user

      delete api_user_path(id: user1.id), nil, {'Authorization' => 'Token token="'+user2.authentication_token+'", email="'+user2.email+'"'}
      expect(response).to have_http_status(403)
    end
  end
end
