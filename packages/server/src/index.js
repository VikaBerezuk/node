const express = require('express');
const multer = require('multer');
const { generateUploadURL } = require('./s3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./../web/dist'));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 20971520,
  },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length'], 10);
    if(fileSize > 20971520) {
      return cb( new Error('File to large'));
    }
    return cb(null, true);
  }
});

app.post('/*', (req, res) => {
  const uploadToS3 = upload.single('file');
  uploadToS3(req, res, async (err) => {
    if (err) {
      console.log(err);
    }
    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname.replace(/\s/g, '')}`;
      const params = {
        Body: req.file.buffer,
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
      };
      const arrSize = [
        { name: 'thumb', size: 300 },
        { name: 'medium', size: 1024 },
        { name: 'large', size: 2048 },
      ];
      const arrPromise = [];
      arrSize.forEach((item) => {
        const promise = generateUploadURL(params, req.file, fileName, item.size, item.name).then((data) => {
            console.log(data);
            return {
              size: `${item.name}`,
              href: `https://upload-s3-bucket-thing.s3.eu-central-1.amazonaws.com/${item.name}_${fileName}`
            };
          },
        );
        arrPromise.push(promise);
      });
      Promise.all(arrPromise).then(data => {
        console.log(data);
        res.send(data);
      }).catch((err) => console.log(err));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
