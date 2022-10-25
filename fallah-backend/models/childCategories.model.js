const mongoose = require("mongoose");

const childCatSchema = new mongoose.Schema({
  mainCategoryID: {
    type: String,
  },
  name: {
    type: String,
    required: "Name is required",
  },
});

const ChildeCategory = mongoose.model("ChildeCategory", childCatSchema);

module.exports = ChildeCategory;
