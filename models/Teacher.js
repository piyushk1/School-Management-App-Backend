const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacherID: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Teacher', teacherSchema);
