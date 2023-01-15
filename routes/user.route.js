const express=require("express");
const {Usermodel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userRouter=express.Router();
userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body;
    try {
    bcrypt.hash(pass,5, async (err, secure_password)=> {
            if(err){
                console.log(err);
            }else{
                const user=new Usermodel({email,pass:secure_password,name,age});
                await user.save();
                res.send("Registered")
            }
      });
    } catch (error) {
        res.send("Error in registering the user");
        console.log(error);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const encrypted_pass =await Usermodel.find({email});
        if(encrypted_pass.length>0){
            bcrypt.compare(pass, encrypted_pass[0].pass, (err, result)=> {
                if(result){
                    const token = jwt.sign({ userID:encrypted_pass[0]._id }, 'masai');
                    res.send({"msg":"login successful","token":token,"userdetails":encrypted_pass[0].name})
                }else{
                    res.send("wrong credentials");
                }
            });
        }else{
            res.send("Wrong credentials")
        }
    } catch (error) {
        res.send("Something went wrong");
        console.log(error)
    }
})
userRouter.get("/about",(req,res)=>{
    res.send("About API")
})
userRouter.get("/data",(req,res)=>{
    const token=req.headers.authorization;
    jwt.verify(token, 'masai',(err,decoded)=>{
            if(err){
                res.send("Invalid token");
                console.log(err);
            }else{
                res.send("Data...")
            }
    })
 
})
userRouter.get("/cart",(req,res)=>{
    const token=req.query.token
    jwt.verify(token, 'masai',(err,decoded)=>{
            if(err){
                res.send("Invalid token");
                console.log(err);
            }else{
                res.send("Cart page");
         }
    })
})
userRouter.get("/contact",(req,res)=>{
    res.send("contact page")
})

module.exports={
    userRouter
}
// 63c03213f2b2b24d568c9138