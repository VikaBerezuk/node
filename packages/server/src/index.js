const express = require('express');
const { generateUploadURL } = require('./s3');

const app = express();

app.use(express.static('./../web/dist'));

const PORT = process.env.PORT || 3000;
app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
