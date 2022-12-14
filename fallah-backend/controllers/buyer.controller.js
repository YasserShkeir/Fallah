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

const getFarmers = async (req, res) => {
  // Get all farmers
  try {
    const farmers = await User.Farmer.find().select(
      "-password -__v -followers -reviews -following -orders "
    );
    res.status(200).json({
      message: "Farmers fetched successfully",
      farmers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getSearchProducts = async (req, res) => {
  // Get all products
  try {
    const mainCategories = await MainCategory.find();
    let products = [];
    mainCategories.forEach((mainCategory) => {
      mainCategory.childCategories.forEach((childCategory) => {
        childCategory.products.forEach((product) => {
          products.push(product);
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

const followFarmer = async (req, res) => {
  // Follow a farmer
  try {
    const { id } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const farmer = await User.Farmer.findById(id);
    if (farmer) {
      // Check if user already follows the farmer
      let alreadyFollowing = false;
      user.following.forEach((following) => {
        if (following._id.toString() === id) {
          alreadyFollowing = true;
        }
      });
      if (alreadyFollowing) {
        res.status(201).json({
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
    }).select("_id name email phone images description");
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
    let alreadyFollowing = false;
    user.following.forEach((following) => {
      if (following._id.toString() === id) {
        alreadyFollowing = true;
      }
    });
    if (farmer && alreadyFollowing) {
      // Loop through the following array and filter out the id
      user.following = user.following.filter((following) => {
        return following._id.toString() !== id;
      });
      farmer.followers = farmer.followers.filter((follower) => {
        return follower._id.toString() !== req.user._id.toString();
      });
      await user.save();
      await farmer.save();
      res.status(201).json({
        message: "Farmer unfollowed successfully",
      });
    } else {
      res.status(201).json({
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
      // Check if user already reviewed the farmer
      let alreadyReviewed = false;
      user.reviews.forEach((review) => {
        if (review.farmerID.toString() === id) {
          alreadyReviewed = true;
        }
      });
      if (alreadyReviewed) {
        res.status(201).json({
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
      farmerReview.updated_at = new Date();
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

// Orders APIs
// -- Orders - Regular Orders APIs --
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
        updated_at: new Date(),
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

const deleteRegularOrder = async (req, res) => {
  // Delete a regular order
  try {
    const { regularOrderID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const order = user.orders.regularOrders.find((order) => {
      return order._id.toString() === regularOrderID.toString();
    });

    if (order) {
      // Loop through order products and add the quantity back to the farmer's available amount
      for (let i = 0; i < order.products.length; i++) {
        let productInOrder = order.products[i];
        let mainCategoryIDOrder = productInOrder.mainCategoryID;
        let childCategoryIDOrder = productInOrder.childCategoryID;
        let productIDOrder = productInOrder.productID;
        let quantityOrder = productInOrder.amount;

        // Find the main category
        let mainCategory = await MainCategory.findById(mainCategoryIDOrder);
        // Find the child category
        let childCategory = mainCategory.childCategories.find(
          (childCategory) => {
            return (
              childCategory._id.toString() === childCategoryIDOrder.toString()
            );
          }
        );
        // Find the product if it exists
        if (childCategory.products.length > 0) {
          let product = childCategory.products.find((product) => {
            return product._id.toString() === productIDOrder.toString();
          });

          // Save the quantity back to the product available amount
          product.amountAvailable += quantityOrder;
          await mainCategory.save();
        }
      }
      // Find the buyer and delete the order
      user.orders.regularOrders = user.orders.regularOrders.filter((order) => {
        return order._id.toString() !== regularOrderID.toString();
      });
      await user.save();
      res.status(201).json({
        message: "Regular order deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Regular order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateRegularOrderLocation = async (req, res) => {
  // Update a regular order location
  try {
    const { regularOrderID, deliveryLocationID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const order = user.orders.regularOrders.find((order) => {
      return order._id.toString() === regularOrderID.toString();
    });
    if (order) {
      // Check if location is valid
      const location = user.locations.find((location) => {
        return location._id.toString() === deliveryLocationID.toString();
      });
      if (location) {
        order.deliveryLocation = location;
        order.updated_at = new Date();
        await user.save();
        res.status(201).json({
          message: "Regular order location updated successfully",
          regularOrder: order,
        });
      } else {
        res.status(400).json({
          message: "Invalid delivery location",
        });
      }
    } else {
      res.status(400).json({
        message: "Regular order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRegularOrders = async (req, res) => {
  // Get all regular orders
  try {
    const { id } = req.params;
    const user = await User.Buyer.findById(req.user._id);
    if (id) {
      // Get a specific regular order
      const order = user.orders.regularOrders.find((order) => {
        return order._id.toString() === id.toString();
      });
      if (order) {
        res.status(200).json({
          message: "Regular order found",
          regularOrder: order,
        });
      } else {
        res.status(400).json({
          message: "Regular order does not exist",
        });
      }
    } else {
      // Get all regular orders without products inside

      res.status(200).json({
        message: "Regular orders found",
        regularOrders: user.orders.regularOrders,
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

    if (regularOrder.deliveryStatus === "Pending") {
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
              if (
                productInOrder.amount + quantity <= product.amountAvailable &&
                productInOrder.amount + quantity >= 0
              ) {
                // Check if there's enough amount or if the amount is above 0
                if (productInOrder.amount + quantity > product.minBulkAmount) {
                  // If quantity is more than min bulk amount
                  productInOrder.amount += quantity;
                  product.amountAvailable -= quantity;
                  productInOrder.price = product.bulkPrice;
                  productInOrder.productTotal = (
                    productInOrder.amount * productInOrder.price
                  ).toFixed(2);
                  productInOrder.updated_at = new Date();
                } else {
                  // If quantity is less than min bulk amount
                  productInOrder.amount += quantity;
                  product.amountAvailable -= quantity;
                  productInOrder.price = product.pricePerMeasuringUnit;
                  productInOrder.productTotal = (
                    productInOrder.amount * productInOrder.price
                  ).toFixed(2);
                  productInOrder.updated_at = new Date();
                }
              } else {
                res.status(400).json({
                  message: "Invalid quantity",
                });
              }
            } else {
              // If product is not in order
              if (quantity <= product.amountAvailable) {
                // If quantity is less than or equal to amount available
                if (quantity > product.minBulkAmount) {
                  // If quantity is more than min bulk amount
                  product.amountAvailable -= quantity;
                  const productToAdd = {
                    farmerID: product.farmerID,
                    mainCategoryID: mainCategoryID,
                    childCategoryID: childCategoryID,
                    productID: productID,
                    productName: product.productName,
                    price: product.bulkPrice,
                    amount: quantity,
                    productTotal: (quantity * product.bulkPrice).toFixed(2),
                    createdAt: new Date(),
                    updated_at: new Date(),
                  };
                  regularOrder.products.push(productToAdd);
                } else {
                  // If quantity is less than min bulk amount
                  product.amountAvailable -= quantity;
                  const productToAdd = {
                    farmerID: product.farmerID,
                    mainCategoryID: mainCategoryID,
                    childCategoryID: childCategoryID,
                    productID: productID,
                    productName: product.productName,
                    price: product.pricePerMeasuringUnit,
                    amount: quantity,
                    productTotal: (
                      quantity * product.pricePerMeasuringUnit
                    ).toFixed(2),
                    createdAt: new Date(),
                    updated_at: new Date(),
                  };
                  regularOrder.products.push(productToAdd);
                }
              } else {
                res.status(400).json({
                  message: "Not enough product available",
                });
              }
            }

            if (res.statusCode !== 400) {
              let total = 0;
              regularOrder.products.forEach((product) => {
                total += product.productTotal;
              });
              regularOrder.orderSubtotal = total;
              regularOrder.updated_at = new Date();

              await user.save();
              await mainCategory.save();
              res.status(201).json({
                message: "Product added to regular order successfully",
                regularOrder: regularOrder,
              });
            }
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
    } else {
      res.status(400).json({
        message: "Cannot add product to a regular order that is not pending",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const removeProductFromRegularOrder = async (req, res) => {
  // Remove a product from a regular order
  try {
    const { regularOrderID, productID } = req.body;
    const user = await User.Buyer.findById(req.user._id);

    const regularOrder = user.orders.regularOrders.find((order) => {
      return order._id.toString() === regularOrderID.toString();
    });

    if (regularOrder.deliveryStatus === "Pending") {
      const productInOrder = regularOrder.products.find((product) => {
        return product._id.toString() === productID.toString();
      });

      if (productInOrder) {
        const mainCategory = await MainCategory.findById(
          productInOrder.mainCategoryID
        );

        if (mainCategory) {
          const childCategory = mainCategory.childCategories.find(
            (category) => {
              return (
                category._id.toString() ===
                productInOrder.childCategoryID.toString()
              );
            }
          );

          if (childCategory) {
            const product = childCategory.products.find((product) => {
              return (
                product._id.toString() === productInOrder.productID.toString()
              );
            });

            if (product) {
              product.amountAvailable += productInOrder.amount;
              regularOrder.products = regularOrder.products.filter(
                (product) => {
                  return product._id.toString() !== productID.toString();
                }
              );

              let total = 0;
              regularOrder.products.forEach((product) => {
                total += product.productTotal;
              });
              regularOrder.orderSubtotal = total;
              regularOrder.updated_at = new Date();

              await user.save();
              await mainCategory.save();
              res.status(201).json({
                message: "Product removed from regular order successfully",
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
      } else {
        res.status(400).json({
          message: "Product is not in regular order",
        });
      }
    } else {
      res.status(400).json({
        message:
          "Cannot remove product from a regular order that is not pending",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const approveRegularOrder = async (req, res) => {
  // Approve a regular order
  try {
    const { regularOrderID } = req.body;
    const user = await User.Buyer.findById(req.user._id);

    const regularOrder = user.orders.regularOrders.find((order) => {
      return order._id.toString() === regularOrderID.toString();
    });

    if (regularOrder.deliveryStatus === "Pending") {
      regularOrder.deliveryStatus = "Approved";
      regularOrder.updated_at = new Date();

      await user.save();
      res.status(201).json({
        message: "Regular order approved successfully",
        regularOrder: regularOrder,
      });
    } else {
      res.status(400).json({
        message: "Cannot approve a regular order that is not pending",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// -- Orders - Scheduled Orders APIs --
const createScheduledOrder = async (req, res) => {
  // Create a scheduled order
  try {
    const { scheduleFrequency, scheduleStartDate, scheduleEndDate } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const newScheduledOrder = {
      scheduleFrequency: scheduleFrequency,
      scheduleStartDate: scheduleStartDate,
      scheduleEndDate: scheduleEndDate,
      deliveryStatus: "Pending",
      deliveryLocation: null,
      requestedCategories: [],
      createdAt: new Date(),
      updated_at: new Date(),
    };
    user.orders.scheduledOrders.push(newScheduledOrder);
    await user.save();
    res.status(201).json({
      message: "Scheduled order created successfully",
      scheduledOrder: newScheduledOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editScheduledOrder = async (req, res) => {
  // Edit a scheduled order
  try {
    const {
      scheduledOrderID,
      scheduleFrequency,
      scheduleStartDate,
      scheduleEndDate,
    } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });
    if (scheduledOrder.deliveryStatus === "Pending") {
      if (scheduleFrequency)
        scheduledOrder.scheduleFrequency = scheduleFrequency;
      if (scheduleStartDate)
        scheduledOrder.scheduleStartDate = scheduleStartDate;
      if (scheduleEndDate) scheduledOrder.scheduleEndDate = scheduleEndDate;
      scheduledOrder.updated_at = new Date();
      await user.save();
      res.status(201).json({
        message: "Scheduled order edited successfully",
        scheduledOrder: scheduledOrder,
      });
    } else {
      res.status(400).json({
        message: "Cannot edit a scheduled order that is not pending",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteScheduledOrder = async (req, res) => {
  // Delete a scheduled order
  try {
    const { scheduledOrderID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });
    if (scheduledOrder) {
      if (scheduledOrder.deliveryStatus === "Pending") {
        user.orders.scheduledOrders = user.orders.scheduledOrders.filter(
          (order) => {
            return order._id.toString() !== scheduledOrderID.toString();
          }
        );
        await user.save();
        res.status(201).json({
          message: "Scheduled order deleted successfully",
          scheduledOrder: scheduledOrder,
        });
      } else {
        res.status(400).json({
          message: "Cannot delete a scheduled order that is not pending",
        });
      }
    } else {
      res.status(400).json({
        message: "Scheduled order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateScheduledOrderLocation = async (req, res) => {
  // Update a scheduled order's delivery location
  try {
    const { scheduledOrderID, deliveryLocationID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });
    if (scheduledOrder) {
      if (scheduledOrder.deliveryStatus === "Pending") {
        const deliveryLocation = user.locations.find((location) => {
          return location._id.toString() === deliveryLocationID.toString();
        });
        if (deliveryLocation) {
          scheduledOrder.deliveryLocation = deliveryLocation;
          scheduledOrder.updated_at = new Date();
          await user.save();
          res.status(201).json({
            message: "Scheduled order's delivery location updated successfully",
            scheduledOrder: scheduledOrder,
          });
        } else {
          res.status(400).json({
            message: "Delivery location does not exist",
          });
        }
      } else {
        res.status(400).json({
          message:
            "Cannot update a scheduled order's delivery location that is not pending",
        });
      }
    } else {
      res.status(400).json({
        message: "Scheduled order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getScheduledOrders = async (req, res) => {
  // If user sends ID, return that specific scheduled order
  try {
    const { id } = req.params;
    const user = await User.Buyer.findById(req.user._id);
    if (id) {
      const scheduledOrder = user.orders.scheduledOrders.find((order) => {
        return order._id.toString() === id.toString();
      });
      if (scheduledOrder) {
        res.status(200).json({
          message: "Scheduled order retrieved successfully",
          scheduledOrder: scheduledOrder,
        });
      } else {
        res.status(400).json({
          message: "Scheduled order does not exist",
        });
      }
    } else {
      res.status(200).json({
        message: "Scheduled orders retrieved successfully",
        scheduledOrders: user.orders.scheduledOrders,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const approveScheduledOrder = async (req, res) => {
  // Approve a scheduled order
  try {
    const { scheduledOrderID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });
    if (scheduledOrder) {
      if (scheduledOrder.deliveryStatus === "Pending") {
        scheduledOrder.deliveryStatus = "Approved";
        scheduledOrder.updated_at = new Date();
        await user.save();
        res.status(201).json({
          message: "Scheduled order approved successfully",
          scheduledOrder: scheduledOrder,
        });
      } else {
        res.status(400).json({
          message: "Cannot approve a scheduled order that is not pending",
        });
      }
    } else {
      res.status(400).json({
        message: "Scheduled order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addScheduledOrderCategory = async (req, res) => {
  // Add a child category to a scheduled order
  try {
    const { scheduledOrderID, mainCategoryID, childCategoryID, amount } =
      req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });

    if (scheduledOrder) {
      if (scheduledOrder.deliveryStatus === "Pending") {
        // Loop through main categories and find the category
        const mainCategory = await MainCategory.findById(mainCategoryID);
        if (mainCategory) {
          const childCategory = mainCategory.childCategories.find(
            (category) => {
              return category._id.toString() === childCategoryID.toString();
            }
          );

          if (childCategory) {
            // Check if the category already exists in the scheduled order

            const category = scheduledOrder.requestedCategories.find(
              (category) => {
                return (
                  category.categoryID.toString() === childCategoryID.toString()
                );
              }
            );

            if (category) {
              // If it exists, update the amount
              category.amount = amount;
              category.updated_at = new Date();
            } else {
              // If it doesn't exist, add it
              scheduledOrder.requestedCategories.push({
                categoryID: childCategoryID,
                categoryName: childCategory.name,
                amount: amount,
              });
            }
            scheduledOrder.updated_at = new Date();
            await user.save();
            res.status(201).json({
              message: "Scheduled order's category updated successfully",
              scheduledOrder: scheduledOrder,
            });
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
      } else {
        res.status(400).json({
          message: "Cannot update a scheduled order that is not pending",
        });
      }
    } else {
      res.status(400).json({
        message: "Scheduled order does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteScheduledOrderCategory = async (req, res) => {
  // Delete a child category from a scheduled order
  try {
    const { scheduledOrderID, childCategoryID } = req.body;
    const user = await User.Buyer.findById(req.user._id);
    const scheduledOrder = user.orders.scheduledOrders.find((order) => {
      return order._id.toString() === scheduledOrderID.toString();
    });
    if (scheduledOrder) {
      if (scheduledOrder.deliveryStatus === "Pending") {
        // Loop through main categories and find the category
        const category = scheduledOrder.requestedCategories.find((category) => {
          return category.categoryID.toString() === childCategoryID.toString();
        });
        if (category) {
          scheduledOrder.requestedCategories =
            scheduledOrder.requestedCategories.filter((category) => {
              return (
                category.categoryID.toString() !== childCategoryID.toString()
              );
            });
          scheduledOrder.updated_at = new Date();
          await user.save();
          res.status(201).json({
            message: "Scheduled order's category deleted successfully",
            scheduledOrder: scheduledOrder,
          });
        } else {
          res.status(400).json({
            message: "Category does not exist",
          });
        }
      } else {
        res.status(400).json({
          message: "Cannot update a scheduled order that is not pending",
        });
      }
    } else {
      res.status(400).json({
        message: "Scheduled order does not exist",
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
  getFarmers,
  getSearchProducts,
  getFollowing,
  unFollowFarmer,
  reviewFarmer,
  getReviews,
  editReview,
  deleteReview,
  // Regular Orders
  getRegularOrders,
  createRegularOrder,
  deleteRegularOrder,
  approveRegularOrder,
  updateRegularOrderLocation,
  addProductToRegularOrder,
  removeProductFromRegularOrder,
  // Scheduled Orders
  createScheduledOrder,
  editScheduledOrder,
  deleteScheduledOrder,
  approveScheduledOrder,
  updateScheduledOrderLocation,
  getScheduledOrders,
  addScheduledOrderCategory,
  deleteScheduledOrderCategory,
};
