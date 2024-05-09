const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://deepaktak1444:Y5b3sGzxUb4Pa3Dd@cluster0.d5fwzpg.mongodb.net/Youtube"
);
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  playlist: { type: [String], default: [] },
});
const User = mongoose.model("users", userSchema);

module.exports = { User };
