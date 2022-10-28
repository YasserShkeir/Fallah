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

const followFarmer = async (req, res) => {
  // Follow a farmer
  try {
    const { id } = req.body;
    const user = await User.User.findById(req.user._id);
    const farmer = await User.User.findById(id);
    if (farmer) {
      if (user.following.includes(id)) {
        res.status(400).json({
          message: "You are already following this farmer",
        });
      } else {
        user.following.push(id);
        farmer.followers.push(req.user._id);
        await user.save();
        await farmer.save();
        res.status(201).json({
          message: "Farmer followed successfully",
        });
      }
    } else {
      res.status(400).json({
        message: "Farmer does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getFollowing = async (req, res) => {
  // Get following
  try {
    const user = await User.User.findById(req.user._id);
    const following = await User.User.find({
      _id: { $in: user.following },
    }).select("_id name email phone");
    res.status(200).json({
      following,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getSeasonalItems,
  followFarmer,
  getFollowing,
};
