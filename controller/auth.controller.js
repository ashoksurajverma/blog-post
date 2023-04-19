const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user.model");

exports.signup = (req, res, next) => {
  const email = req?.body?.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt.hash(password, 12).then((hashedPsw) => {
    const user = new User({
      name: email,
      password: hashedPsw,
      email: email
    })
    return user.save()
  })
  .then(user => {
    res.status(201).json({
      message: "User created!!!", userId: user._id
    })
  })
  .catch((error) => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  })
  console.log(req);
  // res.status(200).json({
  //   message: "User Signup successfully", token: "token"
  // })

}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email})
  .then(user => {
    if (!user) {
      const error = new Error("A user with email address does not exits");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    return bcrypt.compare(password, user.password)
  })
  .then(isEqual => {
    if (!isEqual) {
      const error= new Error("Wrong password")
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email,
      userId: loadedUser._id.toString()
    }, 'surajverma', { expiresIn: '1h' })
    res.status(200).json({
      token,
      userId: loadedUser._id.toString(),
      email
    })

  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
  // res.status(200).json({
  //   message: 'Signin successfully !!!'
  // })
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