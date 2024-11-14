import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import navIcon from './assets/navicon.png'; 

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className="menu-wrapper">

      <button className="menu-button" onClick={toggleMenu}>
        <img src={navIcon} alt="Menu" className="menu-icon" />
      </button>


      {isOpen && (
        <nav className="menu-container">
          <ul className="menu-list">
            <li>
              <Link to="/booking" className="menu-link" onClick={toggleMenu}>
                BOOKING
              </Link>
            </li>
            <li>
              <Link to="/confirmation" className="menu-link" onClick={toggleMenu}>
                CONFIRMATION
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Menu;
