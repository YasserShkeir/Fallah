const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const user = require("../middlewares/user.middleware");
const farmer = require("../middlewares/farmer.middleware");
const buyer = require("../middlewares/buyer.middleware");

// Controllers
// -- User Controller
const {
  getCategories,
  addLocation,
  editLocation,
  deleteLocation,
  getLocations,
} = require("../controllers/user.controller");

// -- Farmer Controller
const {
  registerProduct,
  editProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/farmer.controller");

// -- Buyer Controller
const {
  getSeasonalItems,
  followFarmer,
  getFollowing,
  unFollowFarmer,
  reviewFarmer,
  getReviews,
  editReview,
} = require("../controllers/buyer.controller");

// Create a new router
const router = Router();

// Routes
// -- General User Routes
router.get("/category/:id?/:id2?", auth, user, getCategories); // Get all categories or a specific category or a specific child category
router.post("/location", auth, user, addLocation); // Add a location
router.put("/location", auth, user, editLocation); // Add a location
router.delete("/location", auth, user, deleteLocation); // Delete a location
router.get("/location", auth, user, getLocations); // Get all locations

// -- Farmer Routes
router.post("/product", auth, farmer, registerProduct); // Register a product
router.put("/product", auth, farmer, editProduct); // Edit a product
router.delete("/product", auth, farmer, deleteProduct); // Delete a product
router.get("/product", auth, farmer, getProducts); // Get all products

// -- Buyer Routes
router.get("/seasonal", auth, buyer, getSeasonalItems); // Get seasonal items
router.post("/follow", auth, buyer, followFarmer); // Follow a farmer
router.get("/follow", auth, buyer, getFollowing); // Get all farmers being followed
router.delete("/follow", auth, buyer, unFollowFarmer); // Unfollow a farmer
router.post("/review", auth, buyer, reviewFarmer); // Review a farmer
router.get("/review", auth, buyer, getReviews); // Get all reviews
router.put("/review", auth, buyer, editReview); // Edit a review

module.exports = router;
