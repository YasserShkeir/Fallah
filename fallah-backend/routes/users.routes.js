const { Router } = require("express");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const farmer = require("../middlewares/farmer.middleware");

// Controllers
const { registerProduct } = require("../controllers/farmer.controller");

// Create a new router
const router = Router();

// Register a product
router.post("/register-product", auth, farmer, registerProduct);

module.exports = router;
