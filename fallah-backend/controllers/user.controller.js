const User = require("../models/user.model");
const Categories = require("../models/mainCategory.model");

const getCatergories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCatergories,
  getChildCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
};
