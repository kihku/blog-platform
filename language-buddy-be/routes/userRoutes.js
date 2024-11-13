const express = require('express');
const { getUser, checkId } = require('../controllers/userController');

const router = express.Router();
router.param('id', checkId);
router.route('/:id').get(getUser);
module.exports = router;
