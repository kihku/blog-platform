const express = require('express');
const {
  getUser,
  checkId,
  updateUser,
  updateProgress
} = require('../controllers/userController');

const router = express.Router();
router.param('id', checkId);
router.route('/update').post(updateUser);
router.route('/updateProgress').post(updateProgress)
router.route('/:id').get(getUser);
module.exports = router;
