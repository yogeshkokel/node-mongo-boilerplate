const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    complaintTitle: {
        type: String,
        required: true
    },
    complaintDescription: {
        type: String,
    },
    complaintDate: {
        type: Date
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
})

module.exports = mongoose.model('Complaint', complaintSchema);