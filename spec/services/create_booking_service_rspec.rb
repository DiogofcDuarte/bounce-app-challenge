# spec/services/create_booking_service_spec.rb
require "rails_helper"

RSpec.describe CreateBookingService, type: :service do
  let(:params) { { user_name: "John Doe", email: email, item_quantity: item_quantity, store_id: 1 } }
  let(:email) { "johnCena@example.com" }
  let(:item_quantity) { 1 }
  let(:service) { described_class.new }

  describe "#call" do
    describe "when the service is called with valid params" do
      it "creates a new booking" do
        expect { service.call(params) }.to change(Booking, :count).by(1)
      end

      it "returns the created booking" do
        booking = service.call(params)
        expect(booking).to be_persisted
      end
    end

    describe "when the service is called  with invalid params" do
      describe "when the email is invalid" do
        let(:email) { nil }

        it "raises and Active Record error" do
          expect { service.call(params) }.to raise_error(ActiveRecord::ActiveRecordError)
        end
      end

      describe "when the item_quantity is invalid" do
        let(:item_quantity) { -1 }

        it "raises and Active Record error" do
          expect { service.call(params) }.to raise_error(ActiveRecord::ActiveRecordError)
        end
      end
    end
  end
end
