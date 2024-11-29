const mongoose = require('mongoose');
const { baseModel } = require('./baseModel');

const userSchema = new mongoose.Schema({
  ...baseModel,
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
    unique: true,
  },
  age: Number,
  role: String,
});
userSchema.pre(
  /^find|findOne|update|delete|count|distinct|aggregate/,
  function () {
    this.setQuery({ ...this.getQuery(), env: process.env.NODE_ENV });
  },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
