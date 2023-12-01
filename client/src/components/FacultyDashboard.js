import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Assignment from './Assignment'; 

const FacultyDashboard = () => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState([]);
    const [assignments, setAssignments] = useState([]); // New state for assignments
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/getUserData');
          const users = await response.json();
  
          // Assume the first user is the current user
          setCurrentUser(users[0]);
  
          // Set the remaining users (excluding the first user) to the userData state
          setUserData(users.slice(1));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      const fetchAssignments = async () => {
        try {
          // Fetch assignments data from your API
          const response = await fetch('http://localhost:8000/api/getAssignments');
          const assignmentData = await response.json();
  
          // Set the assignments to the state
          setAssignments(assignmentData);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      };
  
      fetchUserData();
      fetchAssignments();
    }, []);
  

  // Placeholder handleLogout function
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    navigate('/');
  };

  const handleAttendanceClick = () => {
    // Add your logic to navigate to AttendanceManagement.js
    navigate('/attendance');
  };
  const handleAssignmentClick = () => {
    navigate('/assignment');
  };
  return (
    <div>
      <h2>Faculty Dashboard</h2>

      <Row>
        {/* Left Column: Attendance and Assignments Cards */}
        <Col md={4}>
        
          <Card onClick={handleAttendanceClick} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <Card.Title>Attendance</Card.Title>
              {/* Add content for the attendance card */}

            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card onClick={handleAssignmentClick} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>Assignments</Card.Title>
              </Card.Body>
            </Card>
          </Card>
        </Col>

        {/* Right Column: Currently Logged-In User and Logout Button */}
        <Col md={8}>
          <Row className="justify-content-end mb-3">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Currently Logged In</Card.Title>
                  <Card.Text>
                    <strong>Username:</strong> {currentUser.username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Role:</strong> {currentUser.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col md={2}>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          {/* ... (existing code) */}

          {/* Display Assignments */}
          {assignments.map((assignment) => (
            <Assignment key={assignment._id} assignment={assignment} />
          ))}
        </Col>
      </Row>

    </div>
  );
};

export default FacultyDashboard;
