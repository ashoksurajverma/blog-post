const express = require("express");
const {
  signup,
  login,
  getStatus,
  updateStatus
} = require("../controller/auth.controller");

const router = express.Router();

router.put("/signup", signup);
router.post("/login", login);
router.get("/status", getStatus)
router.patch("/status", updateStatus)


module.exports = router;

