const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "Student"
},
gender:{},
dob:{},
phoneNo,
feesPaid:{},
class:{}
});

module.exports = mongoose.model('Teacher', teacherSchema);
