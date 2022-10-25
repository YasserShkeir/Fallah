const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  childCategoryID: {
    type: String,
    required: "Child Category ID is required",
  },
  farmerID: {
    type: String,
    required: "Farmer ID is required",
  },
  productName: {
    type: String,
    required: "Product Name is required",
  },
  startingSeason: {
    type: Date,
  },
  endingSeason: {
    type: Date,
  },
  imageID: {
    type: String,
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
