const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  journeyUnitId: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
