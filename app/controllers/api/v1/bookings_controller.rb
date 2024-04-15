class Api::V1::BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  def index
    @bookings = Booking.all
    render json: @bookings
  end

  def show
  end

  def new
    @booking = Booking.new
  end

  # Here you would verify authentication and roles
  # for something like this where non logged in users can make bookings so no particular role would be required
  def create
    booking = CreateBookingService.new.call(booking_params)
    render json: { data: booking, status: 201 }, :status => :created
  rescue ActionController::ParameterMissing, ArgumentError, ActiveRecord::ActiveRecordError => error
    render json: { error: error.message, status: 400 }, :status => :bad_request
  end

  def edit
  end

  def update
    if @booking.update(booking_params)
      redirect_to @booking, notice: "Task was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    @booking.destroy
    redirect_to tasks_url, notice: "Task was successfully destroyed."
  end

  private

  def set_task
    @booking = Booking.find(params[:id])
  end

  def booking_params
    raise ArgumentError, "Email is required" unless params[:email].present?
    params.permit(:user_name, :card_details, :item_quantity, :store_id, :email)
  end
end
