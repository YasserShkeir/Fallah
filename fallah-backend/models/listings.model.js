const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: "Product ID is required",
  },
  pickupLocationID: {
    type: String,
    required: "Pickup Location ID is required",
  },
  images: {
    type: Array,
  },
  title: {
    type: String,
    required: "Title is required",
  },
  freshStatus: {
    type: String,
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
  dueDate: {
    type: Date,
    required: "Due Date is required",
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

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
