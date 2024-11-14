import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenuPage.css'; 

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-page-container">
      <ul className="menu-list">
        <li>
          <Link to="/booking" className="menu-link-booking">
            BOOKING
          </Link>
        </li>
        <li>
          <Link to="/confirmation" className="menu-link-confirmation">
            CONFIRMATION
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPage;
