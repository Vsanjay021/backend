const mongoose =require("mongoose");

const connection =mongoose.connect("mongodb+srv://sanjayv:sanjay@cluster0.9ycsbw8.mongodb.net/nxmmasai?retryWrites=true&w=majority");


module.exports={
    connection
}