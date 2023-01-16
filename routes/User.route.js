const express=require("express");
const {UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()


const userRouter=express.Router()

// /users/register ==> To register a new user.

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
bcrypt.hash(password,4,async(err,secure_password)=>{
    if(err){
        console.log(err)
    }
    else{
        let user=new UserModel({name,email,gender,password:secure_password})
        await user.save()
        res.send("registration successfull")
    }
})

    }
    catch(err){
res.send("error when registring")
console.log(err)    
}
})
// /users/login ==> For logging in generating a token
userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body
    try{
const user=await UserModel.find({email})
const hashed_password=user[0].password
if(user.length>0){
bcrypt.compare(password,hashed_password,(Err,result)=>{
if(result){
    const token=jwt.sign({userID:user[0]._id},process.env.key)
    console.log(token)
    res.send({"msg":"login successful","token":token})
}else{
    res.send("wrong credentials")
}
})

}
else{
    res.send("wrong credentials")
}
}
    catch(err){
res.send("somthing worng")
console.log(err)
    }
})

module.exports={userRouter}

// /posts ==> This will show the posts of logged in users.
// /posts/update ==> The logged in user can update his/her posts.
//  /posts/delete ==> The logged in user can delete his/her posts.
