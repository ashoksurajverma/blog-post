exports.getAllPost = (req, res) => {

  res.status(200).json({message: 'Get all data '})
}

exports.createPost = (req, res, next) => {
  res.status(200).json({message: 'You have create a post'})
}

exports.getPostWithId = (req, res) => {
  res.status(200).json({
    message: 'You get the post with ID'
  })
}

exports.updatePost = (req, res) => {
  res.status(200).json({
    message: 'You have updated the post'
  })
}

exports.deletePost = (req, res) => {
  res.status(200).json({
    message: "You've deleted the post"
  })
}
