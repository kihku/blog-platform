const mongoose = require('mongoose');
const { baseModel } = require('./baseModel');

const lessonSchema = new mongoose.Schema({
  ...baseModel,
  __v: { type: Number, select: false },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  name: { type: String, required: true },
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
