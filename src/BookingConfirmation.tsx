import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';
import logo from './assets/logo.svg';
import Seeyousoon from './assets/Seeyousoon.png';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return (
      <div>
        <p>Bokningsdata saknas. Gå tillbaka och försök igen.</p>
        <button onClick={() => navigate('/')}>Tillbaka till bokning</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="booking-logo" />
        <img src={Seeyousoon} alt="Logo" className="Seeyousoon-text" />
        </div>
      <h2 className="confirmation-title">
        <span>BOOKING DETAILS</span>
      </h2>
      <fieldset className="booking-details">
        <legend>WHEN</legend>
        <p>{bookingData.when}</p>
      </fieldset>
      <fieldset className="booking-details">
        <legend>WHO</legend>
        <p>{bookingData.people}</p>
      </fieldset>
      <fieldset className="booking-details">
        <legend>LANES</legend>
        <p>{bookingData.lanes}</p>
      </fieldset>
      <fieldset className="booking-details">
        <legend>BOOKING NUMBER</legend>
        <p>{bookingData.id} </p>
      </fieldset>
      <fieldset className="booking-details">
        <legend>SHOE SIZES</legend>
        <p>{bookingData.shoes.join(', ')}</p>
      </fieldset>
      <fieldset className="total-price">
      <span className="total-label"> TOTAL</span>
      <span className="total-value"> {bookingData.price} SEK</span>
      </fieldset>
      <div className='sweet-button-container'>
        <button className="sweet-button" onClick={() => navigate('/')}>SWEET, LET'S GO!</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
