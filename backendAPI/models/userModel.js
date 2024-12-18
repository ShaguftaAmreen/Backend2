const { required } = require("joi");
const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    email:{
        type:String,
        required: [true,"Email is required!"],
        trim:true,
        unique:[true,"Email must be unique!"],
        minLength:[5,"Email must have 5 charecters!"],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password must be provided!"],
        trim:true,
        select:false
   /*select: false hides specific fields (like password, verificationCode, etc.) from being returned by
   default in query results.
   const user = await User.findOne({ email: 'example@example.com' });
// Result might look like:
 without => {
  email: 'example@example.com',
  password: 'hashedpassword123',
  verified: false,
  verificationCode: 'abc123',
  verificationCodeValidation: 123456789,
  // and so on...
 }
  with =>const user = await User.findOne({ email: 'example@example.com' });
// Result will look like:
{
  email: 'example@example.com',
  verified: false,
  createdAt: '2024-12-18T12:34:56Z',
  updatedAt: '2024-12-18T12:34:56Z',
  // sensitive fields like password and verification codes are not included
}
 */
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
        select:false,
    },
    verificationCodeValidation:{
        type:Number,
        select:false,
    },
    forgotPasswordCode:{
        type:String,
        select:false,
    }
    ,
    forgotPasswordCodeValidation:{
        type:Number,
        select:false,
    },
},
{
timestamps:true
/*
In Mongoose, the option timestamps: true automatically adds two fields to your schema:
 createdAt and updatedAt. 
These fields track when a document was created and last updated.
*/
})

module.exports=mongoose.model("User",userSchema)