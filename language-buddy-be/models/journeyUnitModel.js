const mongoose = require('mongoose');

const journeyUnitSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  language: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
});

const JourneyUnit = mongoose.model('JourneyUnit', journeyUnitSchema);
module.exports = JourneyUnit;
