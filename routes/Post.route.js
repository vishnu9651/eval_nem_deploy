const express=require("express");
const {PostModel}=require("../models/Post.model")


const postRouter=express.Router()

// /posts ==> This will show the posts of logged in users.

postRouter.get("/",async(req,res)=>{

    const post=await PostModel.find()
    res.send(post)
})

//create post
postRouter.post("/create",async(req,res)=>{
    const payload=req.body


    try{
    
        const new_post=new PostModel(payload)
        await new_post.save()
        res.send("created the post")
    }
    catch(err){
res.send("error when registring")
console.log(err)    
}
})

// /posts/update ==> The logged in user can update his/her posts.
postRouter.patch("/update/:id",async(req,res)=>{

    const id=req.params.id;
    const payload=req.body;
    const post=await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!=userID_in_post){
            res.send({"msg":"you are not allowed"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send(`updated the post whose id ${id}`)
        }
}
    catch(err){
res.send("somthing worng")
console.log(err)
    }
})


//  /posts/delete ==> The logged in user can delete his/her posts.


postRouter.delete("/delete/:id",async(req,res)=>{

    const id=req.params.id;
    
    const post=await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!=userID_in_post){
            res.send({"msg":"you are not allowed"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send(`deleted the post whose id ${id}`)
        }
}
    catch(err){
res.send("somthing worng")
console.log(err)
    }
})




module.exports={postRouter}




