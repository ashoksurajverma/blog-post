exports.signup = (req, res) => {
  res.status(200).json({
    message: "User Signup successfully", token: "token"
  })
}

exports.login = (req, res) => {
  res.status(200).json({
    message: 'Signin successfully !!!'
  })
}

exports.getStatus = (req, res) => {
  res.status(200).json({
    status: 'You are new'
  })
}

exports.updateStatus = (req, res) => {
  res.status(200).json({
    message: 'You have updated a status'
  })
}