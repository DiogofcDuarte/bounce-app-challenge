class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.string :user_name
      t.string :email
      t.integer :store_id
      t.integer :item_quantity

      t.timestamps
    end
  end
end
