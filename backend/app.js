const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

module.exports = app;
