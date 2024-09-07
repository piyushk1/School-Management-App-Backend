const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

Admin.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

module.exports = mongoose.model('Admin', Admin);
