import React, { useState } from 'react';
import usePost  from 'axios-hooks';
import Modal from '../Modal/Modal';
import SuccessModal from  '../SuccessModal/SuccessModal'
import BagCounter from '../BagCounter/BagCounter';
import './styles.css';

const API_URL = "http://localhost:3000/api/v1/bookings";

const BookingPage = () => {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [animationLoading, setAnimationLoading] = useState(false);
  const [{ data, loadingRequest, error }, createBooking] = usePost(API_URL, { manual: true });
  const totalPrice = (itemQuantity*4.99).toFixed(2);
  const loading = loadingRequest || animationLoading
 
  const handleMinusClick = () => {
    if (itemQuantity > 1)
    setItemQuantity(itemQuantity - 1);
  };

  const handlePlusClick = () => {
    setItemQuantity(itemQuantity + 1);
  };

/* I used axios for simplicity but normally I would have a hook that I would call here
  that would use reactQuery to make the requests to the backend

  To have the request fail do not fill in the email field
  
  I added a timeout here just to give enough time to see the modal since the request is fast
  in a real scenario I would prefer to just have feedback in the button, disable the button while the request does not finish
  and show the success modal / redirect to a new page when it succeeds 
*/
  const handleSubmit = async () => {
    try {
      setAnimationLoading(true)
      setTimeout(() => {
        setAnimationLoading(false)
      }, 2000);
        const response = await createBooking({
            data: serializeBooking(userName, email, cardDetails, 1, itemQuantity),
            method: 'POST',
         });

         setBookingSuccess(true);
        } catch (err) {
          console.error('Error creating booking:', err);
        }
  };

  /*
   I ended up not using typescript but normally I would have a hook where the request is made
   I would also have a interface for a booking and in that hook I would call the serializer for it
   this request should also have a uuid so that the backend can verify its uniqueness
  */
  function serializeBooking(userName, email, cardDetails, storeId, itemQuantity ) {
    return {
        user_name: userName,
        email: email,
        card_details: cardDetails,
        store_id: storeId,
        item_quantity: itemQuantity,
    }
  };

   /*
    In a real scenario I would have probably explored react hook form for this controller
    It would help me set up the rules for the field validations
    Then I would enforce that the email is required on the frontend and verify that it's valid after user input
    The texts would also be replaced by translations using i18n
   */ 
  return (
    <div className="container bookingContainer">
      <Modal isOpen={loading} text="Placing Booking ..." />  
      <SuccessModal isOpen={bookingSuccess && !loading} text="Booking Placed!" onClose={() => setBookingSuccess(false)} />
      <div className="mb-3" >
        <h2>Booking storage at:</h2>
        <p>Cody's Cookie Store</p>
        <BagCounter
        itemQuantity={itemQuantity}
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
      />
      </div>
      <div className="mb-3">
        <h2>Personal Details</h2>
        <p className="inputTitle">Name</p>
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Please insert your name"
        />
        <p className="inputTitle">Email</p>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please provide your email"
        />
      </div>
      <div className="mb-3">
        <h2>Payment information</h2>
        <p className="inputTitle">Card Details</p>
        <input
          type="text"
          className="form-control"
          value={cardDetails}
          onChange={(e) => setCardDetails(e.target.value)}
          placeholder="XXXX-XXXX-XXXX-XXXX"
        />
        {error && !loading &&(
          <div>
            <p>Your booking has failed.</p>
            <p>Please try again.</p>          
          </div>
        )}
      </div>
      <div className="buttonDiv">
        <div>
          {/* with translations this pluralization of the text would also be cleaner*/}
          <p>{itemQuantity} {itemQuantity === 1 ? 'bag' : 'bags'}</p>
         <h2>{totalPrice}</h2>
       </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Book</button>
      </div>
    </div>
  );
};

export default BookingPage;
