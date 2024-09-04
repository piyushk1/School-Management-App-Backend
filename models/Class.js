const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentFees: { type: Number, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);