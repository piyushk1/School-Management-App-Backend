const mongoose = require('mongoose');

const student = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Student",required: true },
  uidNumber: { type: String, unique: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date },
  phoneNo: { type: String,  },
  feesPaid: { type: Number, default: 0 },
  class: { type: String,  },
  address: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, 
});

module.exports = mongoose.model('Student', student);
