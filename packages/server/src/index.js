const express = require('express');
// const multer  = require('multer');
const { generateUploadURL } = require('./s3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./../web/dist'));

// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) =>{
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) =>{
//     cb(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if(file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"||
//     file.mimetype === "image/jpeg"){
//     cb(null, true);
//   }
//   else{
//     cb(null, false);
//   }
// }
//max size  20971520 === 20
// app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
// app.put("/s3Url", function (req, res, next) {
//
//   let filedata = req.file;
//   console.log(filedata);
//   if(!filedata)
//     res.send("Ошибка при загрузке файла");
//   else
//     res.send("Файл загружен");
// });

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
