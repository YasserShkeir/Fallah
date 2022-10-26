const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  // Create a schema for the locations
  name: String,
  longitude: Number,
  latitude: Number,
});

// No need for a separate Listing Table, products will be managed based on amount + time
const productSchema = new mongoose.Schema({
  // Create a schema for the products collection
  childCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
  },
  productName: {
    type: String,
    required: "Product Name is required",
  },
  images: [String],
  startingSeason: {
    type: Date,
  },
  endingSeason: {
    type: Date,
  },
  harvestedOn: {
    type: Date,
  },
  pickupLocation: locationsSchema,
  freshnessStatus: {
    type: Number,
    min: 1,
    max: 5,
    required: "Freshness Status is required",
  },
  measuringUnit: {
    type: String,
    required: "Measuring Unit is required",
  },
  pricePerMeasuringUnit: {
    type: Number,
    required: "Price Per Measuring Unit is required",
  },
  minBulkAmount: {
    type: Number,
    required: "Minimum Bulk Amount is required",
  },
  bulkPrice: {
    type: Number,
    required: "Bulk Price is required",
  },
  amountAvailable: {
    type: Number,
    required: "Amount Available is required",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const regularOrderSchema = new mongoose.Schema({
  // Create a schema for the regular orders collection
  deliveryDate: {
    type: Date,
    required: "Delivery Date is required",
  },
  deliveryStatus: {
    type: String,
    required: "Delivery Status is required",
  },
  products: [productSchema], // Add the product schema to the regular order schema
});

const scheduledOrderSchema = new mongoose.Schema({
  // Create a schema for the scheduled orders collection
  scheduleFrequency: {
    type: Number,
    required: "Schedule Frequency is required",
  },
  deliveryStatus: {
    type: String,
    required: "Delivery Status is required",
  },
  requestedCategories: [String],
  requestedAmount: {
    type: Number,
    required: "Requested Amount is required",
  },
});

const userSchema = new mongoose.Schema({
  // Create a schema for the users collection
  name: {
    type: String,
    required: "Name is required",
  },
  userType: {
    type: String,
    required: "User Type is required",
  },
  email: {
    type: String,
    required: "Email is required",
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: "Phone Number is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  images: {
    type: Array,
  },
  locations: [locationsSchema], // Add the locations schema to the user schema
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

const buyerSchema = User.discriminator(
  "Buyer",
  new mongoose.Schema(
    {
      farmersReviews: [
        {
          farmerID: {
            type: mongoose.Schema.Types.ObjectId, // This is the ID of the farmer
            ref: "Farmer", // Reference to the Farmer model
          },
          reviewScore: {
            type: Number, // This is the score given by the buyer to the farmer
            required: "Review Score is required", // 1-5
          },
          reviewText: {
            type: String,
            required: "Review Text is required",
          },
          images: {
            type: Array, // Images of the review
          },
          created_at: {
            type: Date,
            default: Date.now,
          },
          updated_at: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      orders: {
        regularOrders: [regularOrderSchema], // Add the regular orders schema to the buyer schema
        scheduledOrders: [scheduledOrderSchema], // Add the scheduled orders schema to the buyer schema
      },
    },
    {
      discriminatorKey: "kind",
    }
  )
);

const farmerSchema = User.discriminator(
  "Farmer",
  new mongoose.Schema(
    {
      products: [productSchema],
    },
    {
      discriminatorKey: "kind",
    }
  )
);

const Buyer = mongoose.model("Buyer");
const Farmer = mongoose.model("Farmer");

module.exports = { User, Buyer, Farmer };
