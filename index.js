const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const multer = require("multer");
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed.route");
const authRoutes = require("./routes/auth.route");
const app = express();
const PORT = 8080;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, uuidv4())
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: storage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data || [];
  res.status(status).json({
    message: message,
    data: data
  })
})
mongoose.connect("mongodb://localhost:27017/mybdagain", { useNewUrlParser: true}).then(() => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log("Server is listen on port "+ PORT);
  })
}).catch((error) => {
  console.log(error)
})