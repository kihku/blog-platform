const Lesson = require('../models/lessonModel');

async function createLesson(req) {
  if (!req.journeyUnitId || !req.name) {
    throw new Error('Invalid request');
  }
  const newLesson = await Lesson.create(req);
  return newLesson;
}

module.exports = {
  createLesson,
};
