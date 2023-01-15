const express=require("express");
const {connection}=require("./configs/db");
const {userRouter}=require("./routes/user.route");
const {noteRouter}=require("./routes/Note.route");
const {authenticate}=require("./middlewares/authenticate.middleware");
const cors = require('cors')

const app=express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home page");
})
app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",noteRouter);
const port=4500;
app.listen(port,async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        console.log("Trouble connecting to db");
    }
    console.log(`Running at ${port}`)
})