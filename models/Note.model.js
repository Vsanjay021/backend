const mongoose=require("mongoose");

const noteschema=mongoose.Schema({
    title:{type:String,required:true},
    note:{type:String,required:true},
    category:{type:String,required:true},
    userID:{type:String,required:true},
},{versionKey:false});


const Notemodel=mongoose.model("note",noteschema);

module.exports={
    Notemodel
}