const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const verify = jwt.verify(token, "123");
    req.email = verify.email;
    next();
  } catch (e) {
    console.log("token error");
    res.json({ message: "Invalid credentials" });
  }
};

module.exports = userMiddleware;
