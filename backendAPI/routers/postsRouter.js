const express = require("express");
const router = express.Router();

const { identifier } = require("../middlewares/identification");

router.get("/all-posts", signup);

router.get("/single-post", signin);

router.post("/create-post", identifier, signout);

router.put("/update-post", identifier, sendVerificationCode);

router.delete("/delete-post", identifier, verifyVerificationCode);



module.exports = router;
