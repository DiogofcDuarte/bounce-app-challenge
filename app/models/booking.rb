class Booking < ApplicationRecord
  validates :email, presence: true
  validates :item_quantity, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
end
