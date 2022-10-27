const User = require("../models/user.model");
const Categories = require("../models/mainCategory.model");

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

module.exports = {
  getCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
};
