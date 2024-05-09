const express = require("express");
const userRouter = require("./routes/userRouter");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

app.listen(3000, () => console.log("server is running"));
