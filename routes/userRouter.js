const { Router } = require("express");
const { User } = require("../db/user");
const jwt = require("jsonwebtoken");

const router = Router();
const JWT_SECRET = 1234;

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userExists = await User.findOne({ email, password });

  if (userExists) {
    const token = jwt.sign({ email }, "123");
    res.json({ token });
  } else {
    res.status(403).json({ message: "invalid username of password" });
  }
});

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  if (emailExists) {
    res.json({ message: "email already in use" });
  } else if (usernameExists) {
    res.json({ message: "username already in use" });
  } else {
    await User.create({ username, email, password });
    res.status(200).json({ message: "user created successfully" });
  }
});

module.exports = router;
