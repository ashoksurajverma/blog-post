const express = require("express");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed.route");
const authRoutes = require("./routes/auth.route");
const app = express();
const PORT = 8080;


app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

mongoose.connect("mongodb://localhost:27017/mybdagain", { useNewUrlParser: true}).then(() => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log("Server is listen on port "+ PORT);
  })
}).catch((error) => {
  console.log(error)
})