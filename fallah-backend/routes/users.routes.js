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

// Create a new router
const router = Router();

// Register a product
router.post("/product", auth, farmer, registerProduct);
router.put("/product", auth, farmer, editProduct);
router.delete("/product", auth, farmer, deleteProduct);
router.get("/product", auth, farmer, getProducts);

module.exports = router;
