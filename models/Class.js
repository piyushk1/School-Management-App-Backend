const classSchema = new mongoose.Schema({
  name: String,
  year: Number,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentFees: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] 
});
