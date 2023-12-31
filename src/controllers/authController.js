const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
const path = require('path');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

const registerUser = async (req, res) => {
  try {
    console.log('Registering user...'); // Add this line
    // ... (existing code for user registration)
    console.log('User registered successfully!');
    res.redirect('/auth/login');     // Add this line
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        console.log('User not found for login:', username);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('Incorrect password for user:', username);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      console.log('User logged in successfully:', username);
      // Send the main app page after successful login
      res.sendFile(path.join(__dirname, '../views/main-app.html'));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    secretKey, // Export the secretKey for other modules if needed
  };
  