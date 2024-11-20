const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  age: Number,
  userName: {
    type: String,
    required: true,
    immutable: true,
  },
  role: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
