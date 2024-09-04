const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    contactDetails: {
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    feesPaid: { type: Number, default: 0 }, 
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' } 
});

module.exports = mongoose.model('Student', StudentSchema);
