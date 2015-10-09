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
      expect(JSON.parse(response.body).size).to eq 2
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
      expect(JSON.parse(response.body).size).to eq 3
    end
  end

  describe "POST /api/trips" do
    it 'should create new trip' do
      user = FactoryGirl.create :user
      trip = {destination: 'London', start_date: '2016-02-01', end_date: '2016-02-06', comment: 'test'}

      expect(Trip.where(destination: trip[:destination]).size).to be 0

      post api_trips_path, {trip: trip}, {'Authorization' => 'Token token="'+user.authentication_token+'", email="'+user.email+'"'}
      expect(response).to have_http_status(201)
      expect(JSON.parse(response.body)['trip']).to_not be_nil
      expect(Trip.where(destination: trip[:destination]).size).to be 1
    end

    it 'should reject create new trip for non authorized user' do
      trip = {destination: 'London', start_date: '2016-02-01', end_date: '2016-02-06', comment: 'test'}
      post api_trips_path, {trip: trip}
      expect(response).to have_http_status(401)
    end
  end

  describe "PATCH /api/trips/:id" do
    it 'should update own trip' do
      user = FactoryGirl.create :user
      trip = FactoryGirl.create :trip, author: user
      new_destination = 'Moscow'

      patch api_trip_path(id: trip.id), {trip: {destination: new_destination}}, {'Authorization' => 'Token token="'+user.authentication_token+'", email="'+user.email+'"'}
      expect(response).to have_http_status(201)
      expect(Trip.find(trip.id).destination).to eq new_destination
    end

    it 'should not allow user1 update trip from user2' do
      user1 = FactoryGirl.create :user
      user2 = FactoryGirl.create :user
      trip = FactoryGirl.create :trip, author: user1

      patch api_trip_path(id: trip.id), {trip: {destination: 'Moscow'}}, {'Authorization' => 'Token token="'+user2.authentication_token+'", email="'+user2.email+'"'}
      expect(response).to have_http_status(403)
    end
  end

  describe "DELETE /api/trips/:id" do
    it 'should delete own trip' do
      user = FactoryGirl.create :user
      trip = FactoryGirl.create :trip, author: user

      delete api_trip_path(id: trip.id), nil, {'Authorization' => 'Token token="'+user.authentication_token+'", email="'+user.email+'"'}
      expect(response).to have_http_status(204)
      expect(Trip.where(id: trip.id).size).to eq 0
    end

    it 'should disallow delete another user trip' do
      user1 = FactoryGirl.create :user
      user2 = FactoryGirl.create :user
      trip = FactoryGirl.create :trip, author: user1

      delete api_trip_path(id: trip.id), nil, {'Authorization' => 'Token token="'+user2.authentication_token+'", email="'+user2.email+'"'}
      expect(response).to have_http_status(403)
    end
  end
end
