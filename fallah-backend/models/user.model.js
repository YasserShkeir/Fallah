const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  // Create a schema for the locations
  name: String,
  longitude: Number,
  latitude: Number,
});

const regularOrderSchema = new mongoose.Schema({
  // Create a schema for the regular orders collection
  deliveryDate: {
    type: Date,
  },
  deliveryStatus: {
    type: String,
    required: "Delivery Status is required",
  },
  deliveryLocation: locationsSchema,
  products: [
    {
      // Create a schema for the products collection
      farmerID: {
        type: String,
        required: true,
      },
      mainCategoryID: {
        type: String,
        required: true,
      },
      childCategoryID: {
        type: String,
        required: true,
      },
      productID: {
        type: String,
        required: "Product ID is required",
      },
      productName: {
        type: String,
        required: "Product Name is required",
      },
      amount: {
        type: Number,
        required: "Amount is required",
      },
      price: {
        type: Number,
        required: "Price is required",
      },
      productTotal: {
        type: Number,
        required: "Product Total is required",
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
  orderSubtotal: {
    type: Number,
    default: 0,
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

const scheduledOrderSchema = new mongoose.Schema({
  // Create a schema for the scheduled orders collection
  scheduleFrequency: {
    // Daily, Weekly, Monthly
    type: String,
    required: "Schedule Frequency is required",
  },
  scheduleStartDate: {
    type: Date,
    required: "Schedule Start Date is required",
  },
  scheduleEndDate: {
    type: Date,
    required: "Schedule End Date is required",
  },
  deliveryStatus: {
    type: String,
    required: "Delivery Status is required",
  },
  deliveryLocation: locationsSchema,
  requestedCategories: [
    {
      categoryID: {
        type: String,
        required: "Category ID is required",
      },
      categoryName: {
        type: String,
        required: "Category Name is required",
      },
      amount: {
        type: Number,
        required: "Amount is required",
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
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
      orders: {
        regularOrders: [regularOrderSchema], // Add the regular orders schema to the buyer schema
        scheduledOrders: [scheduledOrderSchema], // Add the scheduled orders schema to the buyer schema
      },
      following: [
        {
          farmerSchema: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
          },
        },
      ],
      reviews: [
        {
          farmerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
          },
          review: {
            type: String,
            required: "Review is required",
          },
          rating: {
            type: Number,
            required: "Rating is required",
          },
          images: {
            type: Array,
          },
        },
      ],
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
      followers: [
        {
          buyerID: {
            type: mongoose.Schema.Types.ObjectId, // This is the ID of the buyer
            ref: "Buyer", // Reference to the Buyer model
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
      reviews: [
        {
          buyerID: {
            type: mongoose.Schema.Types.ObjectId, // This is the ID of the buyer
            ref: "Buyer", // Reference to the Buyer model
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
    },
    {
      discriminatorKey: "kind",
    }
  )
);

const Admin = mongoose.model("Admin", userSchema);
const Buyer = mongoose.model("Buyer");
const Farmer = mongoose.model("Farmer");

module.exports = { User, Admin, Buyer, Farmer };
