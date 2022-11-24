const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
    } = req.body;

    const farmer = await User.Farmer.findById(req.user._id);

    let newProduct = {
      // Create a new product
      farmerID: req.user._id.toString(),
      farmerName: farmer.name,
      productName,
      images,
      startingSeason,
      endingSeason,
      harvestedOn,
      pickupLocationID,
      measuringUnit,
      pricePerMeasuringUnit,
      minBulkAmount,
      bulkPrice,
      amountAvailable,
      mainCategoryID,
      childCategoryID,
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
          // Check if the location is found, if not throw an error
          if (
            !req.user.locations.find(
              (location) => location._id.toString() === pickupLocationID
            )
          ) {
            res.status(400).json({
              message: "Location does not exist",
            });
          } else {
            // Add the product to the child category
            childCategory.products.push(newProduct);

            await category.save();

            farmer.followers.forEach(async (follower) => {
              // Send notification to followers
              const user = await User.User.findById(follower._id);
              // ** ** ** ** ACTIVATE ONLY WHEN DONE ** ** ** **
              client.messages
                .create({
                  from: `whatsapp:+14155238886`,
                  body: `Hi ${user.name}! ${farmer.name} just added a Product: ${productName}`,
                  to: `whatsapp:${user.phone}`,
                })
                .then((message) => console.log("test: ", message.sid));
            });

            res.status(201).json({
              message: "Product added successfully",
              product: newProduct,
            });
          }
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

          product.productName = productName;
          product.images = images;
          product.startingSeason = startingSeason;
          product.endingSeason = endingSeason;
          product.harvestedOn = harvestedOn;
          product.pickupLocationID = pickupLocationID;
          product.measuringUnit = measuringUnit;
          product.pricePerMeasuringUnit = pricePerMeasuringUnit;
          product.minBulkAmount = minBulkAmount;
          product.bulkPrice = bulkPrice;
          product.amountAvailable = amountAvailable;

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
  // Get all products for current farmer
  try {
    const farmer = await User.Farmer.findById(req.user._id);

    const products = [];

    const categories = await MainCategory.find();

    categories.forEach((category) => {
      category.childCategories.forEach((childCategory) => {
        childCategory.products.forEach((product) => {
          if (product.farmerID === farmer._id.toString()) {
            products.push(product);
          }
        });
      });
    });

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  registerProduct,
  editProduct,
  deleteProduct,
  getProducts,
};
