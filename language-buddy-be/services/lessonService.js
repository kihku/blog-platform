const Lesson = require('../models/lessonModel');

async function createLesson(req) {
  if (!req.journeyUnitId || !req.name) {
    throw new Error('Invalid request, Missing ID or name');
  }
  const lastestRecord = await getHighestOrder(req.journeyUnitId);
  console.log(lastestRecord);
  const order = lastestRecord ? lastestRecord.order + 1 : 1;
  const newLesson = await Lesson.create({ ...req, order });
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

async function getHighestOrder(journeyUnitId) {
  try {
    const [maxOrderResult] = await Lesson.aggregate([
      {
        $match: { journeyUnitId }, // Filter by journeyUnitId
      },
      {
        $group: {
          _id: null,
          maxOrder: { $max: '$order' },
        },
      },
    ]);

    if (!maxOrderResult) return null;

    const record = await Lesson.findOne({
      order: maxOrderResult.maxOrder,
    });
    return record;
  } catch (error) {
    console.error('Error fetching record with highest order:', error);
  }
}
module.exports = {
  createLesson,
  getLessonList,
  getLesson,
};
