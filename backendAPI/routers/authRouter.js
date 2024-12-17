const express=require("express");
const router=express.Router();

const {signin,signup,signout}=require('../controllers/authController')

router.post("/signup",signup);

router.post("/signin",signin);

router.post("/signout",signout)

module.exports=router;
