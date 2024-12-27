import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

import StudentModel from "./models/student.js";

mongoose
  .connect("mongodb://0.0.0.0:27017/RefreshAccessToken")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

/***********************************************************************/

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await StudentModel.create({ name, email, password });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/********************************************************************/

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await StudentModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        const accessToken = jwt.sign(
          { email: email },
          "jwt-access-token-secret-key",
          { expiresIn: "1m" },
        );
        const refreshToken = jwt.sign(
          { email: email },
          "jwt-refresh-token-secret-key",
          { expiresIn: "5m" }
        );
        res.cookie("accessToken1", accessToken, { maxAge: 60000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        res.status(400).json({ success: false, message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ success: false, message: "No record existed!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/********************************************************************/

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
   // if (renewToken(req, res)) {

    const token= renewToken(req,res)
    res.cookie=token
       next();
    // }
  } else {
    jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: "Invalid Token" });
      } else {
        req.email = decoded.email; // Decoded data
        next();
      }
    });
  }
};

/***********************************************************************/

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
 // let exist = false;
 let accessToken;
  if (!refreshToken) {
    return res.json({ success: false, message: "No Refresh Token" });
  } else {
    jwt.verify(
      refreshToken,
      "jwt-refresh-token-secret-key",
      (err, decoded) => { 
        if (err) {
          return res.json({ success: false, message: "Invalid Refresh Token" });
        } else {
           accessToken = jwt.sign(
            { email: decoded.email },
            "jwt-access-token-secret-key",
            { expiresIn: "1m" }
          );
        //  res.cookie("accessToken1", accessToken, { maxAge: 60000 });
        //  exist = true;
        }
      }
    );
  }
  return accessToken;
};

/*************************************************************************/

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ success: true, message: "Authorized" });
});

app.listen(3001, () => {
  console.log("Server is running...");
});
