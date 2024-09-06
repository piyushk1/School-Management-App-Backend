const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    schoolName: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Admin', Admin);
