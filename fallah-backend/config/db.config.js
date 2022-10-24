const mongoose = require("mongoose");

// Database linked successfully to cloud
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database error: ", err);
  });
