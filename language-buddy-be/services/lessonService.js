const Lesson = require('../models/lessonModel');

async function createLesson(req) {
  if (!req.journeyUnitId || !req.name) {
    throw new Error('Invalid request');
  }
  const newLesson = await Lesson.create(req);
  return newLesson;
}

async function getLessonList(req) {
  if (req.journeyUnitId == null) {
    throw new Error('Journey Unit Id is missing');
  }
  const lessons = await Lesson.find(req);
  return lessons;
}

async function getLesson(req) {
  if (req.id == null) {
    throw new Error('Missing param');
  }
  const lesson = await Lesson.findOne({ _id: req.id });
  return lesson;
}
module.exports = {
  createLesson,
  getLessonList,
  getLesson,
};
