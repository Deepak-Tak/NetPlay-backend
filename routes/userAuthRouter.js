const { Router } = require("express");
const { User } = require("../db/user");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  console.log(email);

  const password = req.body.password;

  const userExists = await User.findOne({ email, password });

  if (userExists) {
    const token = jwt.sign({ email }, "123");
    res.status(200).json({ token, email, username: userExists.username });
  } else {
    res.status(403).json({ message: "invalid email or password" });
  }
});

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists) {
      res.status(403).json({ message: "email already in use" });
    } else if (usernameExists) {
      res.status(403).json({ message: "username already in use" });
    } else {
      await User.create({ username, email, password });
      res.status(200).json({ message: "user created successfully" });
    }
  } catch (e) {
    res.status(500).json({ message: "try again" });
  }
});

module.exports = router;
