import React, { useState, useEffect } from 'react';
import {  Button, Modal, Form } from 'react-bootstrap';

const AssignmentManagement = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    // Fetch assignment records from the server when the component mounts
    fetchAssignmentData();
  }, []);
  const handleAddAssignment = async () => {
    try {
      // Make a POST request to add a new assignment entry to the server
      const response = await fetch('http://localhost:8000/addAssignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newAssignment.title,
          description: newAssignment.description,
          deadline: newAssignment.deadline,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add assignment. Status: ${response.status}`);
      }
  
      // Log the new assignment details
      console.log('New Assignment:', newAssignment);
  
      // Close the modal after adding the assignment
      handleCloseModal();
  
      // After adding, fetch updated assignment records
      fetchAssignmentData();
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };
  

  const fetchAssignmentData = async () => {
    try {
      // Make a GET request to fetch assignment records from the server
      const response = await fetch('http://localhost:8000/getAssignments');
      const data = await response.json();

      setAssignmentData(data);
    } catch (error) {
      console.error('Error fetching assignment data:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className='center'>
      {/* Button to add a new assignment entry */}
      <button onClick={handleShowModal} className='addassignment'>
        Add Assignment
      </button>

      {/* Modal to add new assignment entry */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assignment title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter assignment description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assignment deadline"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAssignment}>
            Add Assignment
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Assignment Management</h2>

      {/* Display assignment records */}
      <table className="table mx-auto">
        <thead>
          <tr>
            <th scope="col">SL.No</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {assignmentData.map((entry, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{entry.title}</td>
              <td>{entry.description}</td>
              <td>{entry.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentManagement;
