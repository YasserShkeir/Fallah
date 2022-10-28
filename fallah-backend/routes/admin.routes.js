const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

// Admin Controller
const {
  getUsers,
  editUser,
  deleteUser,
  addCategory,
  editCategory,
  deleteCategory,
  addChildCategory,
  editChildCategory,
} = require("../controllers/admin.controller");

// Create a new router
const router = Router();

// Admin Routes
router.get("/users", auth, admin, getUsers); // Get all users
router.put("/users", auth, admin, editUser); // Edit a user
router.delete("/users", auth, admin, deleteUser); // Delete a user

router.post("/category", auth, admin, addCategory); // Add a category
router.put("/category", auth, admin, editCategory); // Edit a category
router.delete("/category", auth, admin, deleteCategory); // Delete a category

router.post("/category/child", auth, admin, addChildCategory); // Add a child category
router.put("/category/child", auth, admin, editChildCategory); // Edit a child category

module.exports = router;
