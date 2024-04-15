# app/repositories/booking_repository.rb
class BookingRepository
  def create!(params)
    Booking.create!(user_name: params[:user_name], email: params[:email], item_quantity: params[:item_quantity], store_id: params[:store_id])
  end

  def find(id)
    Booking.find_by(id: id)
  end

  def update(id, params)
    booking = find(id)
    booking.update(params) if booking
  end

  def delete(id)
    booking = find(id)
    booking.destroy if booking
  end

  def all
    Booking.all
  end
end
