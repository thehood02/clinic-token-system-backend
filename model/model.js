const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  status: {
    required: false,
    type: String, // wait, current, complete
  },
  tokenId: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('token', dataSchema);