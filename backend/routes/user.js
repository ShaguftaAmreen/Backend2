const express = require("express");
const { handleUserSignup } = require("../controller/user");

const router = express.Router();

router.post("/signup", handleUserSignup);

module.exports = router;
