require 'rails_helper'

RSpec.describe "Trips API", type: :request do
  describe "GET /api/trips" do
    it "should show user's trips" do
      user = FactoryGirl.create :user
      user2 = FactoryGirl.create :user
      trip1 = FactoryGirl.create :trip, author: user
      trip2 = FactoryGirl.create :trip, author: user
      trip3 = FactoryGirl.create :trip, author: user2

      get api_trips_path, nil, {'Authorization' => 'Token token="'+user.authentication_token+'", email="'+user.email+'"'}

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['trips'].size).to eq 2
    end

    it 'should show all trips for admin' do
      admin = FactoryGirl.create :user, role: 'admin'
      user1 = FactoryGirl.create :user
      user2 = FactoryGirl.create :user
      trip1 = FactoryGirl.create :trip, author: user1
      trip2 = FactoryGirl.create :trip, author: user1
      trip3 = FactoryGirl.create :trip, author: user2

      get api_trips_path, nil, {'Authorization' => 'Token token="'+admin.authentication_token+'", email="'+admin.email+'"'}

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['trips'].size).to eq 3
    end
  end
end
