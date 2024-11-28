const { createLesson } = require('../services/lessonService');

exports.create = async (req, res) => {
  try {
    createLesson(req.body);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getList = async (req, res) => {};

exports.getLesson = async (req, res) => {};
