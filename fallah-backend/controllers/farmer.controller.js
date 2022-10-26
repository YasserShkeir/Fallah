const User = require("../models/user.model");

const registerProduct = async (req, res) => {
  // Register a product
  try {
    const {
      // Get the data from the request body
      childCategoryID,
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocation,
      freshnessStatus,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    } = req.body;
    let newProduct = {
      // Create a new product
      childCategoryID,
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocation,
      freshnessStatus,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    };
    const farmer = await User.Farmer.findById(req.user._id);
    // Check if product already exists

    const productExists = farmer.products.find(
      (product) => product.productName === productName
    );
    if (productExists) {
      // Check if the product already exists
      return res.status(400).json({
        message: "Product already exists",
      });
    } else {
      farmer.products.push(newProduct);
      await farmer.save();
      res.status(201).json({
        message: "Product registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerProduct,
};
