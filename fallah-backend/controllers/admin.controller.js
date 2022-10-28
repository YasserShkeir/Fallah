const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.User.find().select("-password");
    res.status(200).json({
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    const user = await User.User.findById(id);
    if (user) {
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      await user.save();
      res.status(200).json({
        message: "User updated successfully",
      });
    } else {
      res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.User.findById(id);
    if (user) {
      await user.remove();
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    res

      .status(500)

      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, categoryFamily } = req.body;
    const category = await MainCategory.findOne({ name });
    if (category) {
      res.status(400).json({
        message: "Category already exists",
      });
    } else {
      const newCategory = new MainCategory({
        name,
        categoryFamily,
      });
      await newCategory.save();
      res.status(201).json({
        message: "Category added successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getUsers,
  editUser,
  deleteUser,
  addCategory,
};
