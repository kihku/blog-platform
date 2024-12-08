const mongoose = require('mongoose');
const { baseModel } = require('./baseModel');

const journeyUnitSchema = new mongoose.Schema({
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
  order: { type: Number, required: true },
  language: { type: String, required: true },
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  level: { type: String, required: true },
  coverImage: { type: Object },
});
journeyUnitSchema.index({ env: 1, order: 1 }, { unique: true });
journeyUnitSchema.pre(
  /^find|findOne|update|delete|count|distinct|aggregate/,
  function () {
    this.setQuery({ ...this.getQuery(), env: process.env.NODE_ENV });
  },
);
const JourneyUnit = mongoose.model('JourneyUnit', journeyUnitSchema);
module.exports = JourneyUnit;
