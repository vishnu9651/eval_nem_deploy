const express=require("express")

const {connection}=require("./configs/db")

const {userRouter}=require("./routes/User.route")

const {postRouter}=require("./routes/Post.route")

const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const port=process.env.port

const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(port,async ()=>{
    try {
        await connection
        console.log("connected to data base")
    }
    catch(err){
        console.log(err)
    }
    console.log("port is running")
})