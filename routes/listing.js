const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
 const Review=require("../models/reviews.js");
const {isLoggedIn,isOwner,validateListing,isReviewAuthor}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router.get("/testListing",wrapAsync(async (req,res)=>{
    let sampleListing=new Listing({
        title: "My new Villa",
        description: "By the beach",
        price:1200,
        location: "Calangute, Goa",
        country: "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
}));

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
   upload.single("listing[image]"),
   validateListing,
   listingController.createListing);


router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/search", wrapAsync(async (req, res) => {
    let { q } = req.query;
    if (!q || typeof q !== "string" || q.trim() === "") {
        // If no query, show all listings or handle as you wish
        const listings = await Listing.find({});
        return res.render("listings/index.ejs", { allListings: listings });
    }
    // Search by location (case-insensitive)
    const listings = await Listing.find({
        location: { $regex: q, $options: "i" }
    });
    res.render("listings/index.ejs", { allListings: listings });
}));

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.showEditForm));



module.exports=router;
//router post method
 // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for request");
    // } 
    // let result=listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(400,result.error);
    // }
    // if(!newListing.title){
    //     throw new ExpressError(400,"Title is missing");
    // }
    // if(!newListing.description){
    //     throw new ExpressError("Description is missing");
    // }
    // if(!newListing.location){
    //     throw new ExpressError("location is missing");
    // }
