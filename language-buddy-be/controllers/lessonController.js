const {
  createLesson,
  getLessonList,
  getLesson,
} = require('../services/lessonService');

exports.create = async (req, res) => {
  try {
    const lesson = await createLesson(req.body);
    res.status(200).json({
      status: 'success',
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getList = async (req, res) => {
  try {
    const data = await getLessonList(req.query);
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

exports.getLesson = async (req, res) => {
  try {
    const lesson = await getLesson(req.params);
    res.status(200).json({
      status: 'success',
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
