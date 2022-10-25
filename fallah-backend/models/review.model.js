const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  buyerID: {
    type: String,
    required: "Buyer ID is required",
  },
  farmerID: {
    type: String,
    required: "Farmer ID is required",
  },
  reviewScore: {
    type: Number,
    required: "Review Score is required",
  },
  reviewText: {
    type: String,
    required: "Review Text is required",
  },
  images: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
