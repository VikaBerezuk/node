const dotenv = require('dotenv');
const aws = require('aws-sdk');

dotenv.config();

const region = 'eu-central-1';
const bucketName = 'upload-s3-bucket-thing';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

async function generateUploadURL() {
  const fileName = `${Date.now()}`;//test.png?? формат
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };

  return await s3.getSignedUrlPromise('putObject', params);
}

module.exports = { generateUploadURL };
