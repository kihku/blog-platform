const express = require('express');
const {
  getLesson,
  getList,
  create,
} = require('../controllers/lessonController');
const router = express.Router();

router.route('/:id').get(getLesson);
router.route('/list').get(getList);
router.route('/create').post(create);

module.exports = router;
