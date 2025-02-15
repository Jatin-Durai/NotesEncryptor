const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
