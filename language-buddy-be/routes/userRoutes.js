const express = require('express');
const {
  getUser,
  checkId,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();
router.param('id', checkId);
router.route('/:id').get(getUser);
router.route('/update').post(updateUser);
module.exports = router;
