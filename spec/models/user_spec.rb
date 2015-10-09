require 'rails_helper'

RSpec.describe User, :type => :model do

  describe 'on user create' do
    it 'should generate token on user create' do
      user = FactoryGirl.create :user
      expect(user.authentication_token).to_not be_nil
    end

    it 'should generate hashed password' do
      user = FactoryGirl.create :user
      expect(user.password_digest).to_not be_nil
    end
  end

end