import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {sv} from 'date-fns/locale/sv'; 
import './BookingForm.css'; 
import logo from './assets/logo.svg';
import BOOKING from './assets/BOOKING.png';

interface BookingFormProps {
  setBookingData: (data: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ setBookingData }) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [numLanes, setNumLanes] = useState<number>(1);
  const [shoeSizes, setShoeSizes] = useState<{ [key: number]: number | '' }>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const apiUrl = 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com';
  const apiKey = '738c6b9d-24cf-47c3-b688-f4f4c5747662';

  const handleShoeSizeChange = (playerIndex: number, size: number | '') => {
    setShoeSizes({ ...shoeSizes, [playerIndex]: size });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const shoes = Object.values(shoeSizes).filter(size => size !== '');
    if (shoes.length !== numPlayers) {
      setErrorMessage(`Ange skostorlekar för exakt ${numPlayers} spelare.`);
      return;
    }
  
    if (numPlayers > numLanes * 4) {
      setErrorMessage(`Max 4 spelare per bana. Öka antalet banor eller minska antalet spelare.`);
      return;
    }
  
    if (numLanes > numPlayers) {
      setErrorMessage(`Antalet banor kan inte överstiga antalet spelare. Minska antalet banor.`);
      return;
    }
  
    setErrorMessage('');
    const when = `${date}T${time}`;
  
    const bookingRequest = {
      when,
      lanes: numLanes,
      people: numPlayers,
      shoes,
    };
  
    try {
      const response = await axios.post(
        '/api',
        bookingRequest,
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
  
      
      navigate('/confirmation', { state: { bookingData: response.data } });
    } catch (error: any) {
      console.error("Error during booking:", error);
      alert("Det gick inte att skicka bokningen. Försök igen senare.");
    }
  };

  
  const formattedDate = date
    ? format(new Date(date), 'd MMM', { locale: sv })
    : '';

    return (
      <div className="booking-container">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="booking-logo" />
        <img src={BOOKING} alt="Logo" className="booking-text" />
        </div>
        <form onSubmit={handleSubmit} className="booking-form">
          <h2 className="booking-title">
            <span>WHEN, WHAT & WHO</span>
          </h2>
    
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className='date-time-container'>

            <fieldset className="form-group-date">
              <legend>DATE</legend>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </fieldset>
      

            <fieldset className="form-group-time">
              <legend>TIME</legend>

              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </fieldset>
          </div>
    

          <fieldset className="form-group">
            <legend>NUMBER OF AWESOME BOWLERS</legend>

            <input
              id="players"
              type="number"
              min="1"
              max="10"
              value={numPlayers}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
              required
            />
          </fieldset>
    

          <fieldset className="form-group">
            <legend>NUMBER OF LANES</legend>

            <input
              id="lanes"
              type="number"
              min="1"
              max="5"
              value={numLanes}
              onChange={(e) => setNumLanes(Number(e.target.value))}
              required
            />
          </fieldset>

          <h2 className="shoe-title">
            <span>SHOES</span>
          </h2>

          {Array.from({ length: numPlayers }, (_, i) => (
            <fieldset key={i} className="form-group shoe-size">
              <legend>SHOE SIZE / PERSON {i + 1}</legend>

              <input
                id={`shoeSize-${i}`}
                type="number"
                placeholder="SIZE"
                min="30"
                max="50"
                value={shoeSizes[i] || ''}
                onChange={(e) => handleShoeSizeChange(i, e.target.value ? Number(e.target.value) : '')}
                required
              />
            </fieldset>
          ))}

          <button type="submit" className="submit-button">STRIIIIIIIIKE!</button>
        </form>
      </div>
    );
    
};

export default BookingForm;

