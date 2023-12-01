// HostelManagement.js

import React, { useState } from 'react';

const HostelManagement = () => {
  // Example: Assume hostelData is an array of hostel records
  const [hostelData, setHostelData] = useState([]);

  // Example: Function to handle adding a new hostel entry
  const addHostelEntry = () => {
    // Your logic to add a new hostel entry to the hostelData array
    const newEntry = {
      roomNumber: '101',
      occupant: 'John Doe',
      vacancy: false,
    };

    setHostelData([...hostelData, newEntry]);
  };

  return (
    <div>
      <h2>Hostel Management</h2>

      {/* Display hostel records */}
      <ul>
        {hostelData.map((entry, index) => (
          <li key={index}>
            Room: {entry.roomNumber} - Occupant: {entry.occupant} - Vacancy: {entry.vacancy ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>

      {/* Button to add a new hostel entry */}
      <button onClick={addHostelEntry}>Add Hostel Entry</button>
    </div>
  );
};

export default HostelManagement;
