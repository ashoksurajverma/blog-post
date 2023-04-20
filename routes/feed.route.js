const express = require("express");
const signIn = require("../middleware/is-signin");
const {
  getAllPost,
  createPost,
  deletePost,
  getPostWithId,
  updatePost,
} = require("../controller/feed.controller")

const router = express.Router();

// GET:  all posts
router.get("/posts", signIn, getAllPost);

// create a post
router.post("/post", signIn, createPost);

// Get specific post
router.get("/post/:postId", getPostWithId);

// update a post
router.put("/post/:postId", updatePost)

// delete post
router.delete('/post/:postId', deletePost);

module.exports = router;