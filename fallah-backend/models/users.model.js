const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  images: {
    type: Array,
  },
  name: {
    type: String,
    required: "Name is required",
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
  locations: [
    {
      name: String,
      longitude: Number,
      latitude: Number,
    },
  ],
  farmersReviews: [
    {
      farmerID: {
        type: String,
        required: "Reviewed Farmer ID is required",
      },
      reviewScore: {
        type: Number,
        required: "Review Score is required",
      },
      reviewText: {
        type: String,
        required: "Review Text is required",
      },
      images: {
        type: Array,
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
  orders: [
    {
      locationID: {
        name: String,
      },
      orderType: {
        type: String,
        required: "Order Type is required",
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
  products: [
    {
      childCategoryName: {
        name: String,
        required: "Child Category Name is required",
      },
      productName: {
        type: String,
        required: "Product Name is required",
      },
      startingSeason: {
        type: Date,
      },
      endingSeason: {
        type: Date,
      },
      imageID: {
        type: String,
      },
      listings: [
        {
          pickupLocation: {
            type: String,
            required: "Pickup Location ID is required",
          },
          images: {
            type: Array,
          },
          title: {
            type: String,
            required: "Title is required",
          },
          freshStatus: {
            type: String,
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
          dueDate: {
            type: Date,
            required: "Due Date is required",
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

module.exports = User;
