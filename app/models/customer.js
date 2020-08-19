const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        minlength: 10
    },
    customerImage: {
        type: String
    }
})

module.exports = mongoose.model('Customer', customerSchema);