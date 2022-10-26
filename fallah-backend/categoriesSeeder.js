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

const grannySmithImg = "./assets/images/apples/granny-smith.jpg";
const goldenDeliciousImg = "./assets/images/apples/golden-delicious.jpg";
const redDeliciousImg = "./assets/images/apples/red-delicious.jpg";
const applesImg = "./assets/images/apples/allApples.jpg";
const navelOrangesImg = "./assets/images/oranges/navelOranges.jpg";
const bloodOrangesImg = "./assets/images/oranges/bloodOranges.jpg";
const orangesImg = "./assets/images/oranges/allOranges.jpg";

console.log("seeding database...");

const seedCategories = [
  {
    name: "Apples",
    categoryFamily: "Fruits",
    childCategories: [
      {
        name: "Granny Smith",
        image: grannySmithImg,
      },
      {
        name: "Golden Delicious",
        image: goldenDeliciousImg,
      },
      {
        name: "Red Delicious",
        image: redDeliciousImg,
      },
      {
        name: "Other / Local Apples",
        image: applesImg,
      },
    ],
  },
  {
    name: "Oranges",
    categoryFamily: "Fruits",
    childCategories: [
      {
        name: "Navel",
        image: navelOrangesImg,
      },
      {
        name: "Blood Orange",
        image: bloodOrangesImg,
      },
      {
        name: "Other / Local Oranges",
        image: orangesImg,
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
