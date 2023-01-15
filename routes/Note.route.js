const express=require("express");
const {Notemodel}=require("../models/Note.model");
const noteRouter=express.Router();


noteRouter.get("/",async (req,res)=>{
    //verify token
    try {
        let data=await Notemodel.find();
        console.log("All the notes");
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.post("/create",async (req,res)=>{
    //verify token
    const payload=req.body;
    try {
    const new_note=new Notemodel(payload);
    await new_note.save();
    res.send("Created the note")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    //verify token
    const payload=req.body;
    const ID=req.params.id;
    const note=await Notemodel.findOne({_id:ID})
    const userID_note=note.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_note!==userID_req){
            res.send({"msg":"Your are not authorized"})
        }else{
            await Notemodel.findByIdAndUpdate({"_id":ID},payload);
            res.send({"msg":"Updated the note"})
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
noteRouter.delete("/delete/:id",async (req,res)=>{
    //verify token
    const ID=req.params.id;
    const note=await Notemodel.findOne({_id:ID})
    const userID_note=note.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_note!=userID_req){
            res.send({"msg":"You are not authorized"})
        }else{
            await Notemodel.findByIdAndDelete({_id:ID})
            res.send({"msg":"Deleted the note"})
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    noteRouter
}
