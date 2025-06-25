const express=require("express");
const router=express.Router();
//for posts
router.get("/",(req,res)=>{
    res.send("Get a post");
})
//Get Route
router.get("/:id",(req,res)=>{
     res.send("Get for post id");
});
//Post Route
router.post("/",(req,res)=>{
    res.send("Create for a post");
})
//Delete Route
router.delete("/:id",(req,res)=>{
    res.send("Delete for a post");
});

module.exports=router;