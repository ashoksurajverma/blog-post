const Post = require("../model/post.model");
const User = require("../model/user.model");
const path = require("path");
const fs = require("fs");

exports.getAllPost = (req, res, next) => {
  Post.find()
  .then(posts => {
    res.status(200).json({
      posts
    })
  }).catch(error => {
  })  
}

exports.createPost = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace("\\", "/");
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  })
  post.save()
  .then(result => {
    return User.findById(req.userId)
  })
  .then(user => {
    creator = user;
    user.posts.push(post);
    return user.save()
  })
  .then(result => {
    res.status(201).json({
      message: 'Post created successfully !!!',
      post: post,
      creator: {
        _id: creator._id,
        name: creator.name
      }
    })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  })
}

exports.getPostWithId = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
  .then(post => {
    if (!post) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(post)
  }).catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  })
}

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  if (!req.file) {
    const error = new Error("Image not provided");
    error.statusCode = 403;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace("\\", "/");

  Post.findById(postId).then(post => {
    if (!post) {
      const error = new Error("Post does not exits");
      error.statusCode = 404;
      throw post;
    }
    // to check same user updating
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }
    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl)
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    return post.save()
  }).then(result => {
    res.status(200).json({
      message: 'Post updated',
      post: result,
    })
  }).catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  })
}


exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId).then(post => {
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 403;
      throw error;
    }
    if(post.creator.toString() !== req.userId) {
      const error = new Error("Not authorizes");
      error.statusCode = 403;
    }
    clearImage(post.imageUrl);
    return Post.findByIdAndDelete(postId)
  })
  .then(result => {
    return User.findById(req.userId)
  })
  .then(user => {
    user?.posts?.pull(postId)
    return user.save()
  })
  .then(result => {
    res.status(200).json({
      message: 'Post is deleted !!!'
    })
  })
  res.status(200).json({
    message: "You've deleted the post"
  })
}


const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err))
}