const express = require('express');
const multer = require('multer');
const { upload } = require('../controllers/uploadController');

const _upload = multer();
const router = express.Router();
router.post('/', _upload.single('file'), upload);

module.exports = router;
