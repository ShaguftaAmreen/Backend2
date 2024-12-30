const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes=require("./routes/studentRoutes")
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/indexing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


  app.use("/api", studentRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Hello from the server." });
});

app.use(errorHandler);
  
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});