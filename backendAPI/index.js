const express = require("express");
require("dotenv").config();
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


mongoose
  .connect("mongodb://0.0.0.0:27017/somethingelse")
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const authRouter = require("./routers/authRouter");

app.use(cors());
app.use(helmet());//The helmet package in Node.js is a security middleware for Express applications.
app.use(express.json());
app.use(cookieParser());//cookie-parser is a middleware in Node.js for handling cookies in your Express applications. 
app.use(express.urlencoded({ extended: true }));//express.urlencoded helps Express handle form submissions.
                                               //It turns the form data into an easy-to-use object.

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server." });
});

app.listen(process.env.PORT, () => {
  console.log("Listening...", `running on ${process.env.PORT}`);
});
