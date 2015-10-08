require 'rails_helper'

RSpec.describe Trip, :type => :model do
  before do
    @trip = Trip.new(destination: "Antarctica")
  end

  subject { @trip }

  describe "when destination is not present" do
    before { @trip.destination = " " }
    it { should_not be_valid }
  end
end