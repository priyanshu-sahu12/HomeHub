const mongoose = require('mongoose');
const review = require('./review.js');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    review:[
    {
        type:Schema.Types.ObjectId,
        ref: "Review",
    },
  ],
    owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// listingSchema.pre("save", function (next) {
//     if (!this.image || !this.image || this.image.trim() === "") {
//       this.image = "https://images5.alphacoders.com/130/1308151.jpeg";
//     }
//     next();
//   });


listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
  await review.deleteMany({ _id: { $in: listing.review } } );
  }
});
   
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;