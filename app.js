const express = require('express');
const app = express();
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

app.get('/upload', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image uploaded.');
});

const port = 3000;
const start = () => {
  app
    .listen(port, () => {
      console.log(`Server is connected and listening on port ${port}`);
    })
    .on('error', (error) => {
      console.log(`Error starting the server: ${error}`);
    });
};

start();

module.exports = app;
