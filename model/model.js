const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    // waiting, ongoing, complete
    status: {
        required: false,
        type: String
    },
    tokenId: {
        required: false,
        type: String
    }
});

module.exports = mongoose.model('data', dataSchema);