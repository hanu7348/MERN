// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Login from './components/Login';
import FacultyDashboard from './components/FacultyDashboard';
import AttendanceManagement from './components/AttendanceManagement';
import Assignment from './components/Assignment';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/assignment" element={<Assignment />} />
          {/* Add other routes for different pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
