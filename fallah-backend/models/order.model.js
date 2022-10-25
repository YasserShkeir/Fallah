const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerID: {
    type: String,
    required: "Buyer ID is required",
  },
  locationID: {
    type: String,
    required: "Location ID is required",
  },
  orderType: {
    type: String,
    required: "Order Type is required",
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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
