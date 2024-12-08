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
router.route('/:id').get(getUser);
router.route('/updateProgress').post(updateProgress)
module.exports = router;
