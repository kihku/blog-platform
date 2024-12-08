const { checkBuckets, uploadFile } = require('../services/uploadService');

exports.checkBucket = async (req, res, next) => {
  checkBuckets();
  next();
};

exports.upload = async (req, res) => {
  let error;
  const data = await uploadFile(req.file).catch((err) => (error = err));
  if (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  } else {
    res.status(200).json({
      status: 'success',
      data,
    });
  }
};
