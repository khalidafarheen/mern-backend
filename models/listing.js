const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User=require("./user.js");
const Review=require("./reviews.js");
const { StringModule } = require("@faker-js/faker");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
         url:String,
         filename:String,
    } ,
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type:{
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
    },
    category: {
        type:String,
        enum:["mountains","Arctic","Trending","farms"],
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in : listing.reviews}})
}});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
