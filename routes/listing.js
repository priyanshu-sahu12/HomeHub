const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require('../controllers/listings.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/")
.get( wrapAsync (listingController.index))
.post( 
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing,  
    wrapAsync (listingController.createListing));


router.route("/:id")
.get( wrapAsync (listingController.showListings))
.put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync (listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync (listingController.deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.editListing));

module.exports = router;