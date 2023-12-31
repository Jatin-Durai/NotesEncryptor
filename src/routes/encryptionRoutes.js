// /src/routes/encryptionRoutes.js
const express = require('express');
const encryptionController = require('../controllers/encryptionController');
const middleware = require('../utils/middleware');
const router = express.Router();

// Endpoint for text encryption
router.post('/encrypt', middleware.authenticateToken, encryptionController.encryptText);

module.exports = router;
