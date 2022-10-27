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

const getChildCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Categories.findById(id);
    res.status(200).json({
      categories,
    });
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

module.exports = {
  getCatergories,
  getChildCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
};
