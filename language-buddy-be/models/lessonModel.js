const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
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
  type: { type: String, required: true }, // vocab, listen, reading
  data: {
    type: Object,
    required: true,
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
