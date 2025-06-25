const express=require("express");
const router=express.Router();
//users

router.get("/",(req,res)=>{
    res.send("HI for users");
});
//Get Route
router.get("/:id",(req,res)=>{
     res.send("Get for user id");
});
//Post Route
router.post("/",(req,res)=>{
    res.send("Create for a user");
})
//Delete Route
router.delete("/:id",(req,res)=>{
    res.send("Delete for a user");
});
module.exports=router;