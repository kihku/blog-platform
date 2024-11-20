const User = require('../models/userModel');

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > 3) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: 'success', data: { id: newUser._id } });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({ status: 'success', data: { id: user } });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: 'success', data: user });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
