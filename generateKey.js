// generateKey.js
const crypto = require('crypto');

// Generate a secure, random key (256 bits)
const secureKey = crypto.randomBytes(32).toString('hex');

console.log('Secure Key:', secureKey);
