const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const farmer = require("../middlewares/farmer.middleware");

// Controllers
const {
  registerProduct,
  editProduct,
} = require("../controllers/farmer.controller");

// Create a new router
const router = Router();

// Register a product
router.post("/product", auth, farmer, registerProduct);
router.put("/product", auth, farmer, editProduct);

module.exports = router;
