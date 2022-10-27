const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const registerProduct = async (req, res) => {
  // Register a product
  try {
    const {
      // Get the data from the request body
      mainCategoryID,
      childCategoryID,
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocationID,
      freshnessStatus,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    } = req.body;

    let newProduct = {
      // Create a new product
      farmerID: req.user._id.toString(),
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocationID,
      freshnessStatus,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    };

    const category = await MainCategory.findById(mainCategoryID); // Get the category

    if (category) {
      const childCategories = category.childCategories; // Get the child categories

      const childCategory = childCategories.find(
        (childCategory) => childCategory._id.toString() === childCategoryID
      ); // Get the child category

      if (childCategory) {
        // Check if product name already exists
        if (
          childCategory.products.find(
            (product) =>
              product.productName === productName &&
              product.farmerID === req.user._id.toString()
          )
        ) {
          res.status(400).json({
            message: "Product name already exists",
          });
        } else {
          // Add the product
          childCategory.products.push(newProduct);

          await category.save();

          res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
          });
        }
      } else {
        res.status(400).json({
          message: "Child category does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Category does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editProduct = async (req, res) => {
  // Edit a product
  try {
    const {
      // Get the data from the request body
      categoryID,
      childCategoryID,
      productID,
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocationID,
      freshnessStatus,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    } = req.body;

    const category = await MainCategory.findById(categoryID);

    if (category) {
      const childCategories = category.childCategories;

      const childCategory = childCategories.find(
        (childCategory) => childCategory._id.toString() === childCategoryID
      );

      if (childCategory) {
        const product = childCategory.products.find(
          (product) => product._id.toString() === productID
        );

        if (product) {
          // Edit the product

          if (productName) product.productName = productName;
          if (images) product.images = images;
          if (startingSeason) product.startingSeason = startingSeason;
          if (endingSeason) product.endingSeason = endingSeason;
          if (harvestedOn) product.harvestedOn = harvestedOn;
          if (pickupLocationID) product.pickupLocationID = pickupLocationID;
          if (freshnessStatus) product.freshnessStatus = freshnessStatus;
          if (measuringUnit) product.measuringUnit = measuringUnit;
          if (pricePerMeasuringUnit)
            product.pricePerMeasuringUnit = pricePerMeasuringUnit;
          if (minBulkAmount) product.minBulkAmount = minBulkAmount;
          if (bulkPrice) product.bulkPrice = bulkPrice;
          if (amountAvailable) product.amountAvailable = amountAvailable;

          await category.save();

          res.status(201).json({
            message: "Product edited successfully",
            product,
          });
        } else {
          res.status(400).json({
            message: "Product does not exist",
          });
        }
      } else {
        res.status(400).json({
          message: "Child category does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Category does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  // Delete a product
  try {
    const { categoryID, childCategoryID, productID } = req.body;

    const category = await MainCategory.findById(categoryID);

    if (category) {
      const childCategories = category.childCategories;

      const childCategory = childCategories.find(
        (childCategory) => childCategory._id.toString() === childCategoryID
      );

      if (childCategory) {
        const product = childCategory.products.find(
          (product) => product._id.toString() === productID
        );

        if (product) {
          // Delete the product
          childCategory.products = childCategory.products.filter(
            (product) => product._id.toString() !== productID
          );

          await category.save();

          res.status(201).json({
            message: "Product deleted successfully",
          });
        } else {
          res.status(400).json({
            message: "Product does not exist",
          });
        }
      } else {
        res.status(400).json({
          message: "Child category does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Category does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
