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
  deleteReview,
  getRegularOrders,
  createRegularOrder,
  deleteRegularOrder,
  approveRegularOrder,
  updateRegularOrderLocation,
  addProductToRegularOrder,
  removeProductFromRegularOrder,
  createScheduledOrder,
  editScheduledOrder,
  deleteScheduledOrder,
  updateScheduledOrderLocation,
  getScheduledOrders,
  addScheduledOrderCategory,
  deleteScheduledOrderCategory,
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
// -- -- Buyer - Seasonal Items
router.get("/seasonal", auth, buyer, getSeasonalItems); // Get seasonal items
// -- -- Buyer - Following Routes
router.post("/follow", auth, buyer, followFarmer); // Follow a farmer
router.get("/follow", auth, buyer, getFollowing); // Get all farmers being followed
router.delete("/follow", auth, buyer, unFollowFarmer); // Unfollow a farmer
// -- -- Buyer - Reviews Routes
router.post("/review", auth, buyer, reviewFarmer); // Review a farmer
router.get("/review", auth, buyer, getReviews); // Get all reviews
router.put("/review", auth, buyer, editReview); // Edit a review
router.delete("/review", auth, buyer, deleteReview); // Delete a review
// -- -- Buyer - Regular Orders Routes
router.get("/regular-order/:id?", auth, buyer, getRegularOrders); // Get all regular orders or a specific regular order
router.post("/regular-order", auth, buyer, createRegularOrder); // Create a regular order
router.delete("/regular-order", auth, buyer, deleteRegularOrder); // Delete a regular order
router.put("/regular-order", auth, buyer, approveRegularOrder); // Approve a regular order
router.put("/regular-order/location", auth, buyer, updateRegularOrderLocation); // Update a regular order's location
router.post("/regular-order/product", auth, buyer, addProductToRegularOrder); // Add a product to a regular order
router.delete(
  "/regular-order/product",
  auth,
  buyer,
  removeProductFromRegularOrder
); // Remove a product from a regular order
// -- -- Buyer - Scheduled Orders Routes
router.get("/scheduled-order/:id?", auth, buyer, getScheduledOrders); // Get all scheduled orders or a specific scheduled order
router.post("/scheduled-order", auth, buyer, createScheduledOrder); // Create a scheduled order
router.put("/scheduled-order", auth, buyer, editScheduledOrder); // Edit a scheduled order
router.delete("/scheduled-order", auth, buyer, deleteScheduledOrder); // Delete a scheduled order
router.put(
  "/scheduled-order/location",
  auth,
  buyer,
  updateScheduledOrderLocation
); // Update a scheduled order's location
router.post(
  "/scheduled-order/category",
  auth,
  buyer,
  addScheduledOrderCategory
); // Add a category to a scheduled order
router.delete(
  "/scheduled-order/category",
  auth,
  buyer,
  deleteScheduledOrderCategory
); // Delete a category from a scheduled order

module.exports = router;
