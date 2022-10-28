const mongoose = require("mongoose");

const User = require("../models/user.model");
const MainCategory = require("../models/mainCategory.model");

const getSeasonalItems = async (req, res) => {
  // Get seasonal items
  try {
    const mainCategories = await MainCategory.find();
    let seasonalItems = [];
    mainCategories.forEach((mainCategory) => {
      mainCategory.childCategories.forEach((childCategory) => {
        childCategory.products.forEach((product) => {
          if (
            product.startingSeason.getMonth() <= new Date().getMonth() &&
            product.endingSeason.getMonth() >= new Date().getMonth() &&
            seasonalItems.length < 10 // Limit to 10 items
          ) {
            seasonalItems.push(product);
          }
        });
      });
    });
    res.status(200).json({
      seasonalItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const followFarmer = async (req, res) => {
  // Follow a farmer
  try {
    const { id } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);
    if (farmer) {
      if (user.following.includes(id)) {
        res.status(400).json({
          message: "You are already following this farmer",
        });
      } else {
        user.following.push(id);
        farmer.followers.push(req.user._id);
        await user.save();
        await farmer.save();
        res.status(201).json({
          message: "Farmer followed successfully",
        });
      }
    } else {
      res.status(400).json({
        message: "Farmer does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getFollowing = async (req, res) => {
  // Get following
  try {
    const user = await User.Buyer.findById(req.user._id);
    const following = await User.Farmer.find({
      _id: { $in: user.following },
    }).select("_id name email phone");
    res.status(200).json({
      following,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const unFollowFarmer = async (req, res) => {
  // Unfollow a farmer
  try {
    const { id } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);
    if (farmer && user.following.includes(id)) {
      // Loop through the following array and filter out the id
      user.following = user.following.filter((following) => {
        following.toString() !== id;
      });
      farmer.followers = farmer.followers.filter((follower) => {
        follower.toString() !== req.user._id.toString();
      });
      await user.save();
      await farmer.save();
      res.status(201).json({
        message: "Farmer unfollowed successfully",
      });
    } else {
      res.status(400).json({
        message: "Farmer does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const reviewFarmer = async (req, res) => {
  // Review a farmer
  try {
    const { id, reviewScore, reviewText, images } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);
    if (farmer) {
      if (user.reviews.includes(id)) {
        res.status(400).json({
          message: "You have already reviewed this farmer",
        });
      } else {
        user.reviews.push({
          farmerID: id,
          review: reviewText,
          rating: reviewScore,
          images: images,
        });
        farmer.reviews.push({
          buyerID: req.user._id,
          reviewScore,
          reviewText,
          images,
        });
        await user.save();
        await farmer.save();
        res.status(201).json({
          message: "Farmer reviewed successfully",
        });
      }
    } else {
      res.status(400).json({
        message: "Farmer does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editReview = async (req, res) => {
  // Edit a review
  try {
    const { id, reviewScore, reviewText, images } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);

    // Check if user has reviewed the farmer
    const review = user.reviews.find((review) => {
      return review.farmerID.toString() === id.toString();
    });

    if (review) {
      // Update the review
      review.review = reviewText;
      review.rating = reviewScore;
      review.images = images;
      await user.save();

      // Update the farmer's review
      const farmerReview = farmer.reviews.find((review) => {
        return review.buyerID.toString() === req.user._id.toString();
      });
      farmerReview.reviewScore = reviewScore;
      farmerReview.reviewText = reviewText;
      farmerReview.images = images;
      farmerReview.updatedAt = new Date();
      await farmer.save();
      res.status(201).json({
        message: "Review updated successfully",
      });
    } else {
      res.status(400).json({
        message: "You have not reviewed this farmer",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getReviews = async (req, res) => {
  // Get all buyer reviews
  try {
    const user = await User.Buyer.findById(req.user._id);
    res.status(200).json({
      reviews: user.reviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  // Delete a review
  try {
    const { id } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);
    if (farmer) {
      // Check if user has reviewed the farmer
      const review = user.reviews.find((review) => {
        return review.farmerID.toString() === id.toString();
      });
      if (review) {
        // Delete the review
        user.reviews = user.reviews.filter((review) => {
          return review.farmerID.toString() !== id.toString();
        });
        await user.save();
        // Delete the farmer's review
        farmer.reviews = farmer.reviews.filter((review) => {
          return review.buyerID.toString() !== req.user._id.toString();
        });
        await farmer.save();
        res.status(201).json({
          message: "Review deleted successfully",
        });
      } else {
        res.status(400).json({
          message: "You have not reviewed this farmer",
        });
      }
    } else {
      res.status(400).json({
        message: "Farmer does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createRegularOrder = async (req, res) => {
  // Create a regular order
  try {
    const { deliveryLocationID } = req.body;
    const user = await User.Buyer.findById(req.user._id);

    // check if location is valid
    const location = user.locations.find((location) => {
      return location._id.toString() === deliveryLocationID.toString();
    });

    if (location) {
      const regularOrder = {
        deliveryStatus: "Pending",
        deliveryLocation: location,
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      user.orders.regularOrders.push(regularOrder);
      await user.save();
      res.status(201).json({
        message: "Regular order created successfully",
        regularOrder: regularOrder,
      });
    } else {
      res.status(400).json({
        message: "Invalid delivery location",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addProductToRegularOrder = async (req, res) => {
  // Add a product to a regular order
  try {
    const {
      regularOrderID,
      mainCategoryID,
      childCategoryID,
      productID,
      quantity,
    } = req.body;
    const user = await User.Buyer.findById(req.user._id);

    const regularOrder = user.orders.regularOrders.find((order) => {
      return order._id.toString() === regularOrderID.toString();
    });

    const mainCategory = await MainCategory.findById(mainCategoryID);

    if (mainCategory) {
      const childCategory = mainCategory.childCategories.find((category) => {
        return category._id.toString() === childCategoryID.toString();
      });

      if (childCategory) {
        const product = childCategory.products.find((product) => {
          return product._id.toString() === productID.toString();
        });

        if (product) {
          const productInOrder = regularOrder.products.find((product) => {
            return product.productID.toString() === productID.toString();
          });

          if (productInOrder) {
            // If product is already in order
            if (productInOrder.amount + quantity > product.minBulkAmount) {
              // If quantity is more than min bulk amount
              productInOrder.amount += quantity;
              product.quantity -= quantity;
              productInOrder.price = product.bulkPrice;
              productInOrder.productTotal =
                productInOrder.amount * productInOrder.price;
              productInOrder.updatedAt = new Date();
            } else {
              // If quantity is less than min bulk amount
              productInOrder.amount += quantity;
              product.quantity -= quantity;
              productInOrder.price = product.pricePerMeasuringUnit;
              productInOrder.productTotal =
                productInOrder.amount * productInOrder.price;
              productInOrder.updatedAt = new Date();
              console.log(productInOrder);
            }
          } else {
            // If product is not in order
            if (quantity > product.minBulkAmount) {
              // If quantity is more than min bulk amount
              product.quantity -= quantity;
              const productToAdd = {
                productID: productID,
                productName: product.name,
                price: product.bulkPrice,
                amount: quantity,
                productTotal: quantity * product.bulkPrice,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              regularOrder.products.push(productToAdd);
            } else {
              // If quantity is less than min bulk amount
              product.quantity -= quantity;
              const productToAdd = {
                productID: productID,
                productName: product.name,
                price: product.pricePerMeasuringUnit,
                amount: quantity,
                productTotal: quantity * product.pricePerMeasuringUnit,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              regularOrder.products.push(productToAdd);
            }
          }

          let total = 0;
          regularOrder.products.forEach((product) => {
            total += product.productTotal;
          });
          regularOrder.orderSubtotal = total;
          regularOrder.updatedAt = new Date();

          await user.save();
          await mainCategory.save();
          res.status(201).json({
            message: "Product added to regular order successfully",
            regularOrder: regularOrder,
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
        message: "Main category does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getSeasonalItems,
  followFarmer,
  getFollowing,
  unFollowFarmer,
  reviewFarmer,
  getReviews,
  editReview,
  deleteReview,
  createRegularOrder,
  addProductToRegularOrder,
};
