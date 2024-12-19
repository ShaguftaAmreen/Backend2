const { createPostSchema } = require('../middlewares/validator');
const Post = require('../models/postModel'); 

exports.getPosts=async (req,res)=>{
const {page}=req.query;
const postsPerPage=10;
try{
let pageNum=0;
if(page<=1){
    pageNum=0
}
else{
    pageNum=page-1
}
const result =await Post.find().sort({createdAt:-1}).skip(pageNum*postsPerPage).limit(postsPerPage).populate({
    path:"userId",
    select:"email"
})
res.status(200).json({success:true,message:"posts",data:result})
}
catch(error){
    console.log(error)
}
}

/**********************************************************/

exports.createPost=async (req,res)=>{
    const {title,description}=req.body;
    const {userId}=req.user;
    try{
      const { error, value } = createPostSchema.validate({ title,description,userId});
        if (error) {
          return res
            .status(401)
            .json({ success:false, message: error.details[0].message });
        }
        const result=await Post.create({
            title,description,userId,
        })
        res.status(200).json({success:true,message:"Created",data:result})
    }
    catch(error){
        console.log("Error : ",error)
    }

}

/*******************************************************************/


exports.singlePost = async (req, res) => {
    try {
      const { _id } = req.query;
  
      
      const existingPost = await Post.findOne({ _id }).populate({
        path: "userId",
        select: "email",
      });
  
      
      if (!existingPost) {
        return res
          .status(404)
          .json({ success: false, message: "Post unavailable 😢" });
      }
  
      
      res.status(200).json({ success: true, message: "Single post", data: existingPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error 😢" });
    }
  };
  

/*****************************************************************/

exports.updatePost=async (req,res)=>{
    const {_id}=req.query;
    const {title,description}=req.body;
    const {userId}=req.user;
    try{
      const { error, value } = createPostSchema.validate({ title,description,userId});
        if (error) {
          return res
            .status(401)
            .json({ success: false, message: error.details[0].message });
        }
        const existingPost=await Post.findOne({_id})
        if(!existingPost){
            return res
            .status(404)
            .json({success:false,message:"Post unavailable😢"})
        }
         
        if(existingPost.userId.toString()!==userId){
            return res
            .status(404)
            .json({success:false,message:"Unauthorized😢"})
        }
    existingPost.title=title;
    existingPost.description=description;
      const result=await existingPost.save();
        res.status(200).json({success:true,message:"Updated",data:result})

      
        // // Use updateOne() to update the document
        // const result = await Post.updateOne(
        //     { _id, userId }, // Filter criteria
        //     { $set: { title, description } } // Update operation
        // );

    }
    catch(error){
        console.log("Error : ",error)
    }

}

/*****************************************************************/

exports.deletePost=async (req,res)=>{
    const {_id}=req.query;
    const {userId}=req.user;
    try{
     
        const existingPost=await Post.findOne({_id})
        if(!existingPost){
            return res
            .status(404)
            .json({success:false,message:"Post already unavailable😢"})
        }
         
        if(existingPost.userId.toString()!==userId){
            return res
            .status(404)
            .json({success:false,message:"Unauthorized😢"})
        }
    
      await Post.deleteOne({_id})
        res.status(200).json({success:true,message:"Deleted"})
    }
    catch(error){
        console.log("Error : ",error)
    }

}
