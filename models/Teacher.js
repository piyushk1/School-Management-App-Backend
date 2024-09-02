const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    contactDetails: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    salary: {
        type: Number,
        required: true
    },
    assignedClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
