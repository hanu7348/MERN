// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Attendance = require('./models/Attendance'); // Adjust the path based on your project structure


const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/mern';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Get all attendance records
app.get('/getAttendance', async (req, res) => {
  try {
    const attendanceData = await Attendance.find();
    res.json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new attendance entry
app.post('/addAttendance', async (req, res) => {
  try {
    const { studentName, usn, status } = req.body;

    // Create a new attendance record
    const newAttendance = new Attendance({
      studentName,
      usn,
      status,
    });

    // Save the attendance record to the database
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance added successfully' });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// MongoDB schema setup
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Express route for handling login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Store data in MongoDB
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error handling login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/getUserData', async (req, res) => {
  try {
    const userData = await User.find({}, { password: 0 }); // Exclude password field
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
});

// Define Assignment Model
const Assignment = mongoose.model('Assignment', assignmentSchema);

// Express routes for managing assignments
app.use(express.json());

// Get all assignments
app.get('/api/getAssignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new assignment
app.post('/api/addAssignment', async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newAssignment = new Assignment({ title, description, deadline });
    await newAssignment.save();
    res.json({ message: 'Assignment created successfully' });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define your other routes here...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
