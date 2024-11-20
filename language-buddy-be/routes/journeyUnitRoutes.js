const express = require('express');
const { getListUnit } = require('../controllers/journeyUnitController');
const router = express.Router();

router.route('/:id').get(getListUnit);
