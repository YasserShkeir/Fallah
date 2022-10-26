const mongoose = require("mongoose");

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
    },
  ],
});

const MainCategory = mongoose.model("MainCategory", mainCatSchema);

module.exports = MainCategory;
