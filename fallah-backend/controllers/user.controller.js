const User = require("../models/user.model");
const Categories = require("../models/mainCategory.model");

const getSelf = async (req, res) => {
  // Get the user id from the request
  const id = req.user._id;

  // Get the user from the database
  const userFromDB = await User.User.findById(id).select(
    "-password -__v -orders"
  );

  // Send the user
  res.status(200).json(userFromDB);
};

const editProfileImage = async (req, res) => {
  console.log(req.body);
  const imgSrc = req.body.imgSrc;
  const user = await User.Farmer.findById(req.user._id.toString());
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.images[0] = imgSrc;
  await user.save();
  res.status(200).json({ message: "Image updated successfully" });
};

const getCategories = async (req, res) => {
  try {
    const { id, id2 } = req.params;

    if (!id) {
      const categories = await Categories.find();
      res.status(200).json({
        categories,
      });
    } else {
      const category = await Categories.findById(id);
      if (!id2) {
        res.status(200).json({
          categories: category.childCategories,
        });
      } else {
        const childCategory = category.childCategories.find(
          (childCategory) => childCategory._id.toString() === id2
        );
        res.status(200).json({
          categories: childCategory,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addLocation = async (req, res) => {
  // Add a location
  try {
    const { name, longitude, latitude } = req.body;
    const user = await User.User.findById(req.user._id);
    // Add Location
    let location = {
      name,
      longitude,
      latitude,
    };

    if (location) {
      user.locations.push(location);
      await user.save();
      res.status(201).json({
        message: "Location added successfully",
      });
    } else {
      res.status(400).json({
        message: "Location does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editLocation = async (req, res) => {
  // Edit a location
  try {
    const { id, name, longitude, latitude } = req.body;
    const user = await User.User.findById(req.user._id);
    // Edit Location
    let location = user.locations.find(
      (location) => location._id.toString() === id
    );

    if (location) {
      if (name) location.name = name;
      if (longitude) location.longitude = longitude;
      if (latitude) location.latitude = latitude;
      user.updated_at = Date.now();

      await user.save();
      res.status(201).json({
        message: "Location updated successfully",
      });
    } else {
      res.status(400).json({
        message: "Location does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteLocation = async (req, res) => {
  // Delete a location
  try {
    const { id } = req.body;
    const user = await User.User.findById(req.user._id);
    // Delete Location
    const location = user.locations.find(
      (location) => location._id.toString() === id
    );

    if (location) {
      user.locations = user.locations.filter(
        (location) => location._id.toString() !== id
      );
      await user.save();
      res.status(201).json({
        message: "Location deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Location does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLocations = async (req, res) => {
  // Get all locations
  try {
    const user = await User.User.findById(req.user._id);
    res.status(200).json({
      locations: user.locations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFarmerReviews = async (req, res) => {
  const { id } = req.params;
  // Get all reviews
  try {
    const user = await User.User.findById(id);
    res.status(200).json({
      reviews: user.reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFarmerProducts = async (req, res) => {
  // Loop through all categories and get all products of the farmer
  const { id } = req.params;
  try {
    const farmer = await User.Farmer.findById(id);
    const categories = await Categories.find();
    let products = [];
    categories.forEach((category) => {
      category.childCategories.forEach((childCategory) => {
        childCategory.products.forEach((product) => {
          if (product.farmerID.toString() === farmer._id.toString()) {
            products.push(product);
          }
        });
      });
    });
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getSelf,
  editProfileImage,
  getCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
  getFarmerReviews,
  getFarmerProducts,
};
