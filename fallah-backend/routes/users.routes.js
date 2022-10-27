const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const user = require("../middlewares/user.middleware");
const admin = require("../middlewares/admin.middleware");
const farmer = require("../middlewares/farmer.middleware");

// Controllers
// -- User Controller
const {
  getCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
} = require("../controllers/user.controller");

// -- Admin Controller
const { getUsers } = require("../controllers/admin.controller");

// -- Farmer Controller
const {
  registerProduct,
  editProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/farmer.controller");

// Create a new router
const router = Router();

// General User Routes
router.get("/category/:id?/:id2?", auth, user, getCategories); // Get all categories or a specific category or a specific child category
router.post("/location", auth, user, addLocation); // Add a location
router.put("/location", auth, user, editLocation); // Add a location
router.delete("/location", auth, user, deleteLocation); // Delete a location
router.get("/location", auth, user, getLocations); // Get all locations

// Admin Routes
router.get("/users", auth, admin, getUsers); // Get all users

// Farmer Routes
router.post("/product", auth, farmer, registerProduct); // Register a product
router.put("/product", auth, farmer, editProduct); // Edit a product
router.delete("/product", auth, farmer, deleteProduct); // Delete a product
router.get("/product", auth, farmer, getProducts); // Get all products

module.exports = router;
