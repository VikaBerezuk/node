const dotenv = require('dotenv');
const aws = require('aws-sdk');
const sharp = require('sharp');

dotenv.config();

const region = process.env.REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

function generateUploadImg(params, file, name, size, sizeName) {
  return new Promise((resolve, reject) => {
    sharp(file.buffer).resize(size, size).toBuffer().then((buffer) => {
      params.Body = buffer;
      params.Key = `${sizeName}_${name}`;
      s3.putObject(params, (err) => {
        if (err) {
          reject();
        } else {
          resolve(200);
        }
      });
    });
  });
}

function generatedUploadFile(params, fileName) {
  return new Promise((resolve, reject) => {
    params.Key = `${fileName}`;
    s3.putObject(params, (err) => {
      if (err) {
        reject();
      } else {
        resolve(200);
      }
    });
  });
}

module.exports = { generateUploadImg, generatedUploadFile };
