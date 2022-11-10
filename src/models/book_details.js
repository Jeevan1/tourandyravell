const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CostumerBook = new mongoose.Schema({
    username: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cat: {
        type: String
        
    }
});


// Now we need to create a colletion.
const Details = new mongoose.model("Details",CostumerBook);
module.exports = Details;