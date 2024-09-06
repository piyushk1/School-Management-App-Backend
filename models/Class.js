const classSchema = new mongoose.Schema({
  name: String,
  year: Number,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Reference to the Teacher model
  studentFees: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // Reference to the Student model
});
