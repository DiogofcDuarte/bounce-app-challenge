# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

p "Seeding db..."

Booking.create(
  user_name: "D",
  email: "radnom@email.com",
  item_quantity: 1,
  store_id: 1,
)
Booking.create(
  user_name: "c",
  email: "ram@email.com",
  item_quantity: 2,
  store_id: 1,
)
p "Seeds are planted"
