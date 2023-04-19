const express = require("express");
const signIn = require("../middleware/is-signin");
const {
  signup,
  login,
  getStatus,
  updateStatus
} = require("../controller/auth.controller");

const router = express.Router();

router.put("/signup",  signup);
router.post("/login", login);
router.get("/status", signIn, getStatus)
router.patch("/status", signIn, updateStatus)

module.exports = router;

