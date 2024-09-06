const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uidNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Student', studentSchema);
