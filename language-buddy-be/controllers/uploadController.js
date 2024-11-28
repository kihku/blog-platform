const { checkBuckets, uploadFile } = require('../services/uploadService');

exports.checkBucket = async (req, res, next) => {
  checkBuckets();
  next();
};

exports.upload = async (req, res) => {
  try {
    const data = await uploadFile(req.file);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

