const User = require("../models/user");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        
        await User.create({
            name,
            email,
            password,
        });

        
        return res.render("home");  
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
}

module.exports = {
    handleUserSignup,
};







/*const User=require("../models/user")

async function handleUSerSignup(req,res) {
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    })
return res.render("home");
}

module.exports={
    handleUSerSignup,
}*/