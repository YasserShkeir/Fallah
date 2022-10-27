const mongoose = require("mongoose");

// No need for a separate Listing Table, products will be managed based on amount + time
const productSchema = new mongoose.Schema({
  // Create a schema for the products collection
  farmerID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: "Product Name is required",
  },
  images: [String],
  startingSeason: {
    type: Date,
  },
  endingSeason: {
    type: Date,
  },
  harvestedOn: {
    type: Date,
  },
  pickupLocationID: {
    type: String,
    required: "Pickup Location ID is required",
  },
  freshnessStatus: {
    type: Number,
    min: 1,
    max: 5,
    required: "Freshness Status is required",
  },
  measuringUnit: {
    type: String,
    required: "Measuring Unit is required",
  },
  pricePerMeasuringUnit: {
    type: Number,
    required: "Price Per Measuring Unit is required",
  },
  minBulkAmount: {
    type: Number,
    required: "Minimum Bulk Amount is required",
  },
  bulkPrice: {
    type: Number,
    required: "Bulk Price is required",
  },
  amountAvailable: {
    type: Number,
    required: "Amount Available is required",
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

const mainCatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  categoryFamily: {
    // Fruits, Vegetables, Dairy
    type: String,
    required: "Category Family is required",
  },
  childCategories: [
    {
      name: {
        type: String,
        required: "Child Category Name is required",
      },
      image: {
        type: String,
        required: "Child Category Image is required",
      },
      products: [productSchema],
    },
  ],
});

const MainCategory = mongoose.model("MainCategory", mainCatSchema);

module.exports = MainCategory;
