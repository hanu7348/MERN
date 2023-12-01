// models/Login.js
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
