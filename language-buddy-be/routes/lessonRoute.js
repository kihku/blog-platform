const express = require('express');
const {
  getLesson,
  getList,
  create,
} = require('../controllers/lessonController');
const router = express.Router();

router.route('/list').get(getList);
router.route('/create').post(create);
router.route('/:id').get(getLesson);

module.exports = router;
