const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const registerProduct = async (req, res) => {
  // Register a product
  try {
    const {
      // Get the data from the request body
      categoryID,
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
      categoryID,
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

    const category = await MainCategory.findById(categoryID);
    if (category) {
      // Check if the category exists
      const childCategory = category.childCategories.find(
        (childCategory) => childCategory._id == childCategoryID
      );
      if (childCategory) {
        // Check if the child category exists
        const product = childCategory.products.find(
          (product) => product.productName == productName
        );
        if (product) {
          // Check if the product exists
          return res.status(400).json({
            // Return an error
            message: "Product already exists",
          });
        } else {
          childCategory.products.push(newProduct); // Push the new product to the child category
          await category.save(); // Save the category
          return res.status(200).json({
            // Return a success message
            message: "Product registered successfully",
          });
        }
      } else {
        return res.status(400).json({
          // Return an error
          message: "Child Category does not exist",
        });
      }
    } else {
      return res.status(400).json({
        // Return an error
        message: "Category does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      // Return an error
      message: "Server error",
      error: error.message,
    });
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

const getProducts = async (req, res) => {
  // Get all products
  try {
    const farmer = await User.Farmer.findById(req.user._id);
    res.status(200).json({
      products: farmer.products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerProduct,
  editProduct,
  deleteProduct,
  getProducts,
};
