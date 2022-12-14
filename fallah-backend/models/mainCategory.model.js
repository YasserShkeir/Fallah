const mongoose = require("mongoose");

const mainCatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
    unique: true,
  },
  categoryFamily: {
    // Fruits, Vegetables, Dairy
    type: String,
    required: "Category Family is required",
    enum: ["Fruits", "Vegetables", "Dairy"],
  },
  childCategories: [
    {
      name: {
        type: String,
        required: "Child Category Name is required",
        unique: true,
      },
      products: [
        {
          // Create a schema for the products collection
          mainCategoryID: {
            type: String,
            required: true,
          },
          childCategoryID: {
            type: String,
            required: true,
          },
          farmerID: {
            type: String,
            required: true,
          },
          farmerName: {
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
        },
      ],
    },
  ],
});

const MainCategory = mongoose.model("MainCategory", mainCatSchema);

module.exports = MainCategory;
