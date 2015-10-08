require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe "POST /api/sessions" do
    it "should authorize user and return token" do
      user = FactoryGirl.create :user
      post api_sessions_path, {user: {email: user.email, password: user.password}}
      expect(response).to have_http_status(201)
      expect(JSON.parse(response.body).keys).to eq ['email', 'token']
    end
  end
end
