// /src/models/encryptedData.js
const mongoose = require('mongoose');

const encryptedDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  encryptedData: { type: String, required: true }, // Corrected property name
});

const EncryptedData = mongoose.model('EncryptedData', encryptedDataSchema);

module.exports = EncryptedData;
