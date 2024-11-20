const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  setId: {
    type: String,
    required: true,
  },
  font: {
    type: Object,
    required: true,
  },
  back: {
    type: Object,
    required: true,
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
module.exports = Flashcard;
