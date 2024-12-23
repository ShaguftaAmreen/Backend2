require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect, config } = require("./config/config");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());


connect();

app.set("view engine", "ejs");


app.use("/user", userRoute); 
app.use("/", staticRoute); 


app.get("/", (req, res) => {
  res.render("home");
});


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
