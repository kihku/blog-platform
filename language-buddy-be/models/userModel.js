const mongoose = require('mongoose');
const { baseModel } = require('./baseModel');

const userSchema = new mongoose.Schema({
  ...baseModel,
  __v: { type: Number, select: false },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  lastName: String,
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    immutable: true,
  },
  age: Number,
  role: String,
  progress: {
    type: Object,
    required: true,
  },
});
userSchema.index({ env: 1, email: 1 }, { unique: true });
userSchema.pre(
  /^find|findOne|update|delete|count|distinct|aggregate/,
  function () {
    this.setQuery({ ...this.getQuery(), env: process.env.NODE_ENV });
  },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
