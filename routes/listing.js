const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { isLoggedIn, isOwner, validateListing, isReviewAuthor } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ✅ Test route
router.get("/testListing", wrapAsync(async (req, res) => {
    let sampleListing = new Listing({
        title: "My new Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
}));

// ✅ Index (all listings) + Create listing
router
  .route("/")
  .get(wrapAsync(listingController.index)) // show all listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    listingController.createListing
  );

// ✅ Form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ Search listings
router.get("/search", wrapAsync(async (req, res) => {
    const { location, title, maxPrice } = req.query;
    let query = {};
    
    if (location) query.location = { $regex: location, $options: "i" };
    if (title) query.title = { $regex: title, $options: "i" };
    if (maxPrice) query.price = { $lte: parseInt(maxPrice) };
    
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs", { allListings });
}));

// ✅ Show single listing, update, delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

// ✅ Edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.showEditForm));

module.exports = router;
