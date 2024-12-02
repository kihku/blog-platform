const express = require('express');
const {
  getListUnit,
  createUnit,
} = require('../controllers/journeyUnitController');
const router = express.Router();

router.route('/list').get(getListUnit);
router.route('/create').post(createUnit);
module.exports = router;
