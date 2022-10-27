const mongoose = require("mongoose");
require("dotenv").config();

const mainCategory = require("./models/mainCategory.model");

// Database linked successfully to cloud
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database error: ", err);
  });

console.log("seeding database...");

const seedCategories = [
  {
    name: "Apples",
    categoryFamily: "Fruits",
    childCategories: [
      {
        name: "Granny Smith",
        image: "./assets/images/apples/granny-smith.jpg",
        products: [],
      },
      {
        name: "Golden Delicious",
        image: "./assets/images/apples/golden-delicious.jpg",
        products: [],
      },
      {
        name: "Red Delicious",
        image: "./assets/images/apples/red-delicious.jpg",
        products: [],
      },
      {
        name: "Other / Local Apples",
        image: "./assets/images/apples/allApples.jpg",
        products: [],
      },
    ],
  },
  {
    name: "Oranges",
    categoryFamily: "Fruits",
    childCategories: [
      {
        name: "Navel",
        image: "./assets/images/oranges/navelOranges.jpg",
        products: [],
      },
      {
        name: "Blood Orange",
        image: "./assets/images/oranges/bloodOranges.jpg",
        products: [],
      },
      {
        name: "Other / Local Oranges",
        image: "./assets/images/oranges/allOranges.jpg",
        products: [],
      },
    ],
  },
  {
    name: "Bananas",
    categoryFamily: "Fruits",
    childCategories: [
      {
        name: "Somali Bananas",
        image: "./assets/images/bananas/somaliBananas.jpg",
        products: [],
      },
      {
        name: "Other / Local Bananas",
        image: "./assets/images/bananas/allBananas.jpg",
        products: [],
      },
    ],
  },
  {
    name: "Onions",
    categoryFamily: "Vegetables",
    childCategories: [
      {
        name: "Red Onions",
        image: "./assets/images/onions/redOnions.jpg",
        products: [],
      },
      {
        name: "Yellow Onions",
        image: "./assets/images/onions/yellowOnions.jpg",
        products: [],
      },
      {
        name: "White Onions",
        image: "./assets/images/onions/whiteOnions.jpg",
        products: [],
      },
      {
        name: "Other / Local Onions",
        image: "./assets/images/onions/allOnions.jpg",
        products: [],
      },
    ],
  },
  {
    name: "Potatoes",
    categoryFamily: "Vegetables",
    childCategories: [
      {
        name: "Agria Potatoes",
        image: "./assets/images/potatoes/agriaPotatoes.jpg",
        products: [],
      },
      {
        name: "Spunta Potatoes",
        image: "./assets/images/potatoes/spuntaPotatoes.jpg",
        products: [],
      },
      {
        name: "Other / Local Potatoes",
        image: "./assets/images/potatoes/allPotatoes.jpg",
        products: [],
      },
    ],
  },
  {
    name: "Lettuce",
    categoryFamily: "Vegetables",
    childCategories: [
      {
        name: "Iceberg Lettuce",
        image: "./assets/images/lettuce/icebergLettuce.jpg",
        products: [],
      },
      {
        name: "Romaine Lettuce",
        image: "./assets/images/lettuce/romaineLettuce.jpg",
        products: [],
      },
      {
        name: "Other / Local Lettuce",
        image: "./assets/images/lettuce/allLettuce.jpg",
        products: [],
      },
    ],
  },
];

const seedDB = async () => {
  await mainCategory.deleteMany({});
  for (const seed of seedCategories) {
    let category = await mainCategory.create(seed);
  }
};

seedDB().then(() => {
  console.log("Database Seeded");
  mongoose.connection.close();
});
