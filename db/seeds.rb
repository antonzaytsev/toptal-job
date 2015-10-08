# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if User.count == 0
  [
    {email: 'test1@user.com', password: 'password', uid: 1},
    {email: 'test2@user.com', password: 'password', uid: 2},
  ].each {|item| User.create! item}
end

if Trip.count == 0
  [
    {destination: 'London', start_date: 30.days.from_now, end_date: 37.days.from_now, comment: 'This trip is for just married only!', author: User.all.sample.id},
    {destination: 'Sydney', start_date: 18.days.from_now, end_date: 30.days.from_now, comment: 'We will see lots of kangaroo!', author: User.all.sample},
    {destination: 'Moscow', start_date: 21.days.from_now, end_date: 24.days.from_now, comment: 'Hard to stay too long in Moscow!', author: User.all.sample},
  ].each {|item| Trip.create! item}
end