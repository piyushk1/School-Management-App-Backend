// const mongoose = require('mongoose');

// const classSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     year: { type: Number, required: true },
//     teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
//     studentFees: { type: Number, required: true },
//     students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
// }, { timestamps: true });

// module.exports = mongoose.model('Class', classSchema);

const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    studentFees: {
        type: Number,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
