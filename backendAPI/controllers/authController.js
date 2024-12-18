const { signupSchema, signinSchema, acceptCodeSchema, changePasswordSchema } = require("../middlewares/validator");
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const User = require("../models/userModel"); // Import the User model
const jwt=require("jsonwebtoken");
const transport = require("../middlewares/sendMail");



exports.signup = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body)
  try {

    const { error, value } = signupSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists!" });
    }


    const hashedPassword = await doHash(password, 12);

    
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    
    const result = await newUser.save();
    result.password = undefined; // Hide the password in the response

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



/**********************************************************/


exports.signin=async(req,res)=>{
    const{email,password}=req.body;
    try{
     const {error,value}=signinSchema.validate({email,password});
     if(error){
        return res
        .status(401)
        .json({ success: false, message: error.details[0].message }); 
     }
     const existingUser=await User.findOne({email}).select('+password')
     if(!existingUser){
        return res
        .status(401)
        .json({ success: false, message: "User does not exists!" });
     }
     const result=await doHashValidation(password,existingUser.password)
      if(!result){
        return res.status(401)
        .json({success:false,message:"Invalid credentials!"})
      }
const token=jwt.sign({
    userId:existingUser._id,
    email:existingUser.verified,
    verified:existingUser.verified
},
process.env.TOKEN_SECRET,{
    expiresIn:"8h"
}
);
res.cookie("Authorization","Bearer "+token,{expires:new Date(Date.now() +8* 3600000),
    httpOnly:process.env.NODE_ENV === "Production",
    secure:process.env.NODE_ENV === "Production"
}).json({
    success:true,
    token,
    message:"Logged in successfully!"
})
    }
    catch(error){
        console.log(error)
    }
}


/*****************************************************/

exports.signout=async (req,res)=>{
    res.clearCookie("Authorization").status(200)
    .json({success:true,message:"Logged out successfully"})
}

/*****************************************************/ 

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  
  console.log(req.body)

  try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
          return res
              .status(401)
              .json({ success: false, message: "User does not exists!" });
      }

      if (existingUser.verified) {
          return res
              .status(400)
              .json({ success: false, message: "You are already verified!" });
      }

      
      const codeValue = Math.floor(Math.random() * 1000000).toString(); 

      let info = await transport.sendMail({
          from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
          to: existingUser.email,
          subject: "Verification code",
          html: "<h1>" + codeValue + "</h1>"
      });

      //Confirming Email Delivery
      //for checking sending email is successful or not
      if (info.accepted[0] === existingUser.email) {
          //info.accepted is a list of emails that successfully received the message.
          //now if the code sending is successful then we will store the code in the database,
          //before save the code in the database we, should hash the code , but this time we wont use the bcrypt rather than we will use hmac process provided by node js itself
          //ex: info.accepted is like the confirmation list you get from the courier service saying, "Parcel delivered to [email address]."
          //ex:The code is checking if the parcel was delivered to the right person (i.e., existingUser.email) before marking the delivery as successful.
          
          const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
          existingUser.verificationCode = hashedCodeValue;
          existingUser.verificationCodeValidation = Date.now();
          await existingUser.save();

          return res.status(200).json({ success: true, message: "Code sent!" });
      }

      res.status(400).json({ success: false, message: "Code sent failed!" });
  } catch (error) {
      console.log(error);
  }

  // In Simple Terms
  // This function:
  // Checks if the user exists and is not already verified.
  // Creates a 6-digit verification code.
  // Sends the code to the user's email.
  // Confirms the email was delivered.
  // Hashes and stores the code securely in the database.
  // Responds with success or failure based on the process outcome.
};

/****************************************************************/

exports.verifyVerificationCode=async (req,res)=>{
  const {email,providedCode}=req.body;

  try{
    const {error,value}=acceptCodeSchema.validate({email,providedCode})
    if(error){
      return res
      .status(401)
      .json({success:false,message:error.details[0].message})
   }
   const codeValue=providedCode.toString();
   const existingUser=await User.findOne({email}).select("+verificationCode +verificationCodeValidation");
  if(!existingUser){
    return res
    .status(401)
    .json({
      success:false,message:"User does not exists!"
    });
  }
  if(existingUser.verfied){
    return res.status(400).json({success:false,message:"You are already verified!"})
  }
  if(!existingUser.verificationCode || !existingUser.verificationCodeValidation){
    return res
    .status(401)
    .json({
      success:false,message:"Something is wrong with the code!"
    });
  }
  if(Date.now()-existingUser.verificationCodeValidation>5*60*1000){
    return res.status(400)
    .json({success:false,message:"Code has been expired!"})
  }
  const hashedCodeValue=hmacProcess(codeValue,process.env.HMAC_VERIFICATION_CODE_SECRET)
  if(hashedCodeValue===existingUser.verificationCode){
    existingUser.verified=true;
    existingUser.verificationCode=undefined;
    existingUser.verificationCodeValidation=undefined;
    await existingUser.save()
    return res
    .status(200)
    .json({success:false,message:"Your account has been verified."})
  }
  return res
  .status(400)
  .json({success:false,message:"Unexpected occured!"})
}
  catch(error){
    console.log(error);
  }
}

/*************************************************************************/

/*
we have to make some improvements and that is user should 
not able to execute sign out function without a token, similarly
there should not request a code without a token
*/

/***************************************************************/

exports.changePassword=async (req,res)=>{
  //that user which we set in identification.js
  const {userId,verfied}=req.user;
  console.log("use in change password",req.user)
  const {oldPassword,newPassword}=req.body;
  try{
    const {error,value}=changePasswordSchema.validate({oldPassword,newPassword})
    if(error){
      return res
      .status(401)
      .json({success:false,message:error.details[0].message})
   }
   
   if(!verfied){
    return res
    .status(401)
    .json({success:false,message:"You are not verified user!"})
   }
   const existingUser=await User.findOne({_id:userId}).select("+password")
   if(!existingUser){
    return res
    .status(401)
    .json({success:false,message:"User does not exists!"})
   }
   const result=await doHashValidation(oldPassword,existingUser.password)
    if(!result){
      return res.status(401)
      .json({success:false,message:"Invalid credentials!"})
    }
    const hashedPassword= await doHash(newPassword,12);
    existingUser.password=hashedPassword;
    await existingUser.save();
    return res
    .status(200)
    .json({success:true,message:"Password updated!!"});
  }
  catch(error){
  console.log(error);
  }
}