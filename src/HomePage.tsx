import React from 'react';
import './HomePage.css';
import logo from './assets/logo.svg';
import nameImage from './assets/name.png';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/booking'); 
  };

  return (
    <div className="homepage-container">
      <img
        src={logo}
        alt="Logo"
        className="homepage-logo"
        onClick={handleNavigation} 
      />
      <img
        src={nameImage}
        alt="Name"
        className="homepage-name"
        onClick={handleNavigation} 
      />
    </div>
  );
};

export default HomePage;
