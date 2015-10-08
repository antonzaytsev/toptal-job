FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "test#{n}@mail.com"
    end
    sequence :password do |n|
      "passwird#{n}"
    end
  end
end
