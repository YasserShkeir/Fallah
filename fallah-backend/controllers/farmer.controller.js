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

const editProduct = async (req, res) => {
  // Edit a product
  try {
    const {
      // Get the data from the request body
      id,
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

    const farmer = await User.Farmer.findById(req.user._id);
    // Update Product
    const product = farmer.products.find(
      (product) => product._id.toString() === id
    );

    if (product) {
      if (childCategoryID) product.childCategoryID = childCategoryID;
      if (productName) product.productName = productName;
      if (images) product.images = images;
      if (startingSeason) product.startingSeason = startingSeason;
      if (endingSeason) product.endingSeason = endingSeason;
      if (harvestedOn) product.harvestedOn = harvestedOn;
      if (pickupLocation) product.pickupLocation = pickupLocation;
      if (freshnessStatus) product.freshnessStatus = freshnessStatus;
      if (measuringUnit) product.measuringUnit = measuringUnit;
      if (pricePerMeasuringUnit)
        product.pricePerMeasuringUnit = pricePerMeasuringUnit;
      if (minBulkAmount) product.minBulkAmount = minBulkAmount;
      if (bulkPrice) product.bulkPrice = bulkPrice;
      if (amountAvailable) product.amountAvailable = amountAvailable;
      product.updated_at = Date.now();

      await farmer.save();
      res.status(201).json({
        message: "Product updated successfully",
      });
    } else {
      res.status(400).json({
        message: "Product does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  // Delete a product
  try {
    const { id } = req.body;
    const farmer = await User.Farmer.findById(req.user._id);
    // Delete Product
    const product = farmer.products.find(
      (product) => product._id.toString() === id
    );

    if (product) {
      farmer.products = farmer.products.filter(
        (product) => product._id.toString() !== id
      );
      await farmer.save();
      res.status(201).json({
        message: "Product deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Product does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerProduct,
  editProduct,
  deleteProduct,
};
