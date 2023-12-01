// AttendanceManagement.js
import React, { useState, useEffect } from 'react';
import './Attedence.css'; 

const AttendanceManagement = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance records from the server when the component mounts
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Make a GET request to fetch attendance records from the server
      const response = await fetch('http://localhost:8000/getAttendance');
      const data = await response.json();

      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const addAttendance = async () => {
    try {
      // Prompt the user to enter details
      const studentName = window.prompt('Enter Student Name:');
      const usn = window.prompt('Enter USN:');
      const status = window.confirm('Is the student present?') ? 'Present' : 'Absent';
  
      // Check if the user provided a usn
      if (!usn) {
        console.log('USN is required');
        return;
      }
  
      // Make a POST request to add a new attendance entry to the server
      await fetch('http://localhost:8000/addAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          usn,
          date: '2023-01-01', // You can adjust the default date as needed
          status,
        }),
      });
  
      // After adding, fetch updated attendance records
      fetchAttendanceData();
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  }; 

  return (
    <div className='center'>
      {/* Button to add a new attendance entry */}
      <button onClick={addAttendance} className='addstu'>
        Add Attendance
      </button>
      <h2>Attendance Management</h2>
  
      {/* Display attendance records */}
      <table className="table mx-auto">
        <thead>
          <tr>
            <th scope="col">SL.No</th>
            <th scope="col">Student Name</th>
            <th scope="col">USN</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{entry.studentName}</td>
              <td>{entry.usn}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AttendanceManagement;
