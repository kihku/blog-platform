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

exports.getUser = async (req, res) => {
  let error;
  const user = await User.findById(req.params.id).catch((err) => (error = err));
  if (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  } else {
    res.status(201).json({ status: 'success', data: user });
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
