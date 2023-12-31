// index.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.use('/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/textEncrypt', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
