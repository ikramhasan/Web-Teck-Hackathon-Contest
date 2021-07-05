const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router
  .get("/", blogController.getAllBlogs)
  .post("/new", blogController.createBlog)
  .get("/vote", blogController.vote);

router.route("/:id");

module.exports = router;
