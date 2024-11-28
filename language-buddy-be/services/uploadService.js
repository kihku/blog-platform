const minio = require('minio');

const minioClient = new minio.Client({
  endPoint: process.env.MINIO_SERVER_URL,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET,
});

async function checkBucket(bucket) {
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, 'us-east-1');
  }
}

async function checkBuckets() {
  const buckets = ['temporary', 'language-buddy-public'];
  buckets.map((bucket) => checkBucket(bucket));
}

async function copyFile({ etag, name }) {
  const targetBucket = 'language-buddy-public';
  const conds = new Minio.CopyConditions();
  conds.setMatchETag(etag);
  let error, newEtag;
  await minioClient.copyObject(
    targetBucket,
    name,
    `${targetBucket}/${name}`,
    conds,
    (err, data) => {
      error = err;
      newEtag = data.etag;
    },
  );
  if (error) {
    throw new Error(error);
  }
  return {
    etag: newEtag,
    url: `${process.env.MINIO_SERVER_URL}:9000/${targetBucket}/${name}`,
    name,
  };
}

async function uploadFile(file) {
  const bucket = 'temporary';
  console.log(file);
  let error, etag;
  await minioClient.putObject(
    bucket,
    file?.originalname,
    file.buffer,
    (err, data) => {
      error = err;
      etag = data.etag;
    },
  );
  if (error) {
    throw new Error(error);
  }
  return {
    url: `${process.env.MINIO_SERVER_URL}:9000/${bucket}/${file?.originalname}`,
    etag,
    name: file?.originalname,
  };
}

module.exports = {
  copyFile,
  uploadFile,
  checkBuckets,
};
