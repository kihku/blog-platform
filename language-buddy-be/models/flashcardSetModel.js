const mongoose = require('mongoose');

const flashcardSetSchema = new mongoose.Schema({
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
  language: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  tags: { type: [String] },
});

const FlashcardSet = mongoose.model('Flashcard', flashcardSetSchema);
module.exports = FlashcardSet;
