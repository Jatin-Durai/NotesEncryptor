// /src/controllers/encryptionController.js
const crypto = require('crypto');
const User = require('../models/user');
const EncryptedData = require('../models/encryptedData');

const encryptText = async (req, res) => {
  try {
    const { originalData } = req.body;
    const userId = req.user._id;

    // Encrypt the data using the crypto library
    const encryptedData = crypto.createHash('sha256').update(originalData).digest('hex');

    // Store the encrypted data in MongoDB in the "encrypteddatas" collection
    const encryptedDataModel = new EncryptedData({
      userId,
      encryptedData, // Updated property name to match the model
    });

    console.log('Encrypted Data Model:', encryptedDataModel);

    await encryptedDataModel.save();

    res.json({ message: 'Text encrypted and saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  encryptText,
};
