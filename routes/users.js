const { SECRET } = require("../config/keys");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Model
const User = require("../models/User");

//create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Signup user
router.post("/register", async (req, res) => {
  const { email, password, address } = req.body;

  try {
    const user = await User.register(email, password, address);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
