const minio = require('minio');

const minioClient = new minio.Client({
  endPoint: '192.168.31.115',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET,
});

exports.checkBucket = async (req, res, next) => {
  const bucket = 'language-buddy';
  const exists = await minioClient.bucketExists(bucket);
  if (exists) {
    console.log('Bucket ' + bucket + ' exists.');
  } else {
    await minioClient.makeBucket(bucket, 'us-east-1');
  }
  next();
};

exports.upload = async (req, res) => {
  const bucket = 'language-buddy';
  console.log(req.file);
  let error;
  await minioClient.putObject(
    bucket,
    req.file?.originalname,
    req.file.buffer,
    (err) => {
      error = err;
    },
  );
  if (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  } else {
    res.status(200).json({ status: 'success' });
  }
};
