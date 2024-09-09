const mongoose = require('mongoose');

const student = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Student' },
  uidNumber: { type: String,  }, 
  gender: { type: String },
  dob: { type: Date },
  phoneNo: { type: String },
  feesPaid: { type: Boolean, default: false },
  class: { type: String }
});

module.exports = mongoose.model('Student', student);
