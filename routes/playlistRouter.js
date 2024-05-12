const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User } = require("../db/user");

const router = Router();

router.get("/", userMiddleware, async (req, res) => {
  const email = req.email;
  console.log(email);
  const user = await User.findOne({ email });
  res.status(200).json({ message: user.playlist });
});
router.post("/add", userMiddleware, async (req, res) => {
  const email = req.email;
  const playlistItem = req.body.playlistItem;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $addToSet: { playlist: playlistItem } }
    );
    res.status(200).json({ message: "successfull" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong try again" });
  }
});
router.post("/remove", userMiddleware, async (req, res) => {
  const email = req.email;
  const playlistItem = req.body.playlistItem;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { playlist: playlistItem } }
    );
    res.status(200).json({ message: "successfull" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong try again" });
  }
});

module.exports = router;
