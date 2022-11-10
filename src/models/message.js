const mongoose = require('mongoose');
// const validator = require('validator');

const CostumerMessage = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    emails: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// Now we need to create a colletion.
const Message = new mongoose.model("Message",CostumerMessage);
module.exports = Message;