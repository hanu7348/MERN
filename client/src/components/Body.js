// Body.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import './Body.css'; // Import your CSS file for styling

const Body = () => {
  return (
    <div className="body">
      <div className="background-image">
        {/* Background image with typewriter effect text */}
        <h1>Welcome To Our College</h1>
        <p>Empowering Education Through Technology</p>
      </div>
      <div className="student-management">
        <h2>Student Management</h2>
        <div className="card-container">
          {/* 8 clickable cards */}
          <Link to="/attendance" className='link'>
            <div className="card">Attendance Management</div>
          </Link>
          <Link to="/fee" className='link'>
            <div className="card">Student Fee Management</div>
          </Link>
          <Link to="/examination" className='link'>
            <div className="card">Examination Management</div>
          </Link>
          <Link to="/transport" className='link'>
            <div className="card">Transport Management</div>
          </Link>
          <Link to="/library" className='link'>
            <div className="card">Library Management</div>
          </Link>
          <Link to="/hostel" className='link'>
            <div className="card">Hostel Management</div>
          </Link>
          <Link to="/id-card" className='link'>
            <div className="card">ID Card Generation</div>
          </Link>
          <Link to="/homework" className='link'>
            <div className="card">Homework & Class Activity</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
