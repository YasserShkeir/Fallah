const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const farmer = require("../middlewares/farmer.middleware");

// Controllers
const {
  registerProduct,
  editProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/farmer.controller");

const {
  getCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
} = require("../controllers/user.controller");

// Create a new router
const router = Router();

// Farmer Routes
router.post("/product", auth, farmer, registerProduct); // Register a product
router.put("/product", auth, farmer, editProduct); // Edit a product
router.delete("/product", auth, farmer, deleteProduct); // Delete a product
router.get("/product", auth, farmer, getProducts); // Get all products

// General User Routes
router.get("/category/:id?/:id2?", auth, getCategories); // Get all child categories
router.post("/location", auth, addLocation); // Add a location
router.put("/location", auth, editLocation); // Add a location
router.delete("/location", auth, deleteLocation); // Delete a location
router.get("/location", auth, getLocations); // Get all locations

module.exports = router;
