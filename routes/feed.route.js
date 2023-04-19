const express = require("express");
const {
  getAllPost,
  createPost,
  deletePost,
  getPostWithId,
  updatePost,
} = require("../controller/feed.controller")
const router = express.Router();

// GET:  all posts
router.get("/posts", getAllPost);

// create a post
router.post("/post", createPost);

// Get specific post
router.get("/post/:postId", getPostWithId);

// update a post
router.put("/post/:postId", updatePost)

// delete post
router.delete('/post/:postId', deletePost);

module.exports = router;