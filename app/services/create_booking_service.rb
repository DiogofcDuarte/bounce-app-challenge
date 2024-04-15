require_relative "../repositories/booking_repository"

class CreateBookingService
  def initialize
    @booking_repository = BookingRepository.new
  end

  # here you would have the start of the logic required to create the booking
  # probably call the service to verify the card details and that it is a valid card
  # before procceding with the creating of the booking
  # Normally required services would be injected into this services initializer and it would process most logic
  def call(params)
    @booking_repository.create!(params)
  end
end
