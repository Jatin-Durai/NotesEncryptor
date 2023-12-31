// authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto');
const middleware = require('../utils/middleware');
const encryptionController = require('../controllers/encryptionController');

// Registration route
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received. Request body:', req.body);

    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Username and password are required');
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    await newUser.save();

    // Redirect to the login page after successful registration
    res.redirect('/auth/login');
    console.log('Redirected to login page');
  } catch (error) {
    console.error('Error during registration:', error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
      return res.status(400).send('Username already exists');
    }

    if (error.errors) {
      const errorMessage = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(', ');

      return res.status(400).send(`Validation failed: ${errorMessage}`);
    }

    return res.status(500).send('Internal Server Error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  // Implement your login logic here
  // Retrieve user from the database and compare passwords, etc.
  // ...

  // For now, let's assume login is successful
  res.redirect('/views/main-app.html');
  console.log('Login successful');
});

// Handle encrypted data
router.post('/encrypt', async (req, res) => {
    try {
      const originalData = req.body.originalData;
  
      // Check if originalData is provided
      if (!originalData) {
        return res.status(400).json({ message: 'Original data is required' });
      }
  
      // Encrypt the data using your encryption logic (in this case, using crypto)
      const encryptedData = crypto.createHash('sha256').update(originalData).digest('hex');
  
      // Save the encrypted data to the database or perform other actions
      // For now, let's log the encrypted data
      console.log('Encrypted Data Received:', encryptedData);
  
      // Send the encrypted data as the response
      res.status(200).json({ encryptedData });
    } catch (error) {
      console.error('Error handling encrypted data:', error);
  
      // Check if res is defined before using it
      if (res) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
  
  module.exports = router;