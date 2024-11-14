import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
import MenuPage from './MenuPage';
import navIcon from './assets/navicon.png';
import './App.css'; 

const NavigationIcon: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="nav-icon-button" onClick={() => navigate('/menu')}>
      <img src={navIcon} alt="Menu" className="nav-icon" />
    </button>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <NavigationIcon /> 
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<div className="menu-page"><MenuPage /></div>} />
            <Route path="/booking" element={<BookingForm setBookingData={() => {}} />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
