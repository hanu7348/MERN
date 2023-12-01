// ... (imports remain unchanged)
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useHistory, not navigate

import './Header.css';

const Header = () => {
  const navigate = useNavigate(); // Initialize useHistory

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="https://www.shridevipolytechnic.org/wp-content/uploads/2018/03/SHRIDEVI-LOGO.svg" alt="Logo" />
      </div>
      <div className="navbar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Resource</li>
          <li>Departments</li>
        </ul>
      </div>
      <div className="login">
        {/* Attach the handleLoginClick function to the onClick event */}
        <Button variant="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header;
