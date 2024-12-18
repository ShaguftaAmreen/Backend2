const express=require("express");
const router=express.Router();

const {signin,signup,signout,sendVerificationCode,changePassword,verifyVerificationCode}=require('../controllers/authController');
const { identifier } = require("../middlewares/identification");

router.post("/signup",signup);

router.post("/signin",signin);

router.post("/signout",identifier,signout);

router.patch("/send-verification-code",identifier,sendVerificationCode);
router.patch("/verify-verification-code",identifier,verifyVerificationCode);
router.patch("/change-password",identifier,changePassword);

module.exports=router; 
