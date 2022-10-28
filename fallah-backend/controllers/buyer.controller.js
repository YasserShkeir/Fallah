const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const getSeasonalItems = async (req, res) => {
  // Get seasonal items
  try {
    const mainCategories = await MainCategory.find();
    let seasonalItems = [];
    mainCategories.forEach((mainCategory) => {
      mainCategory.childCategories.forEach((childCategory) => {
        childCategory.products.forEach((product) => {
          if (
            product.startingSeason.getMonth() <= new Date().getMonth() &&
            product.endingSeason.getMonth() >= new Date().getMonth() &&
            seasonalItems.length < 10 // Limit to 10 items
          ) {
            seasonalItems.push(product);
          }
        });
      });
    });
    res.status(200).json({
      seasonalItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getSeasonalItems,
};
