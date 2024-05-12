const express = require("express");
const userRouter = require("./routes/userAuthRouter");
const playlistRouter = require("./routes/playlistRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/playlist", playlistRouter);

app.listen(3000, () => console.log("server is running"));
