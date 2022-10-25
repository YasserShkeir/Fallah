const express = require("express");
require("dotenv").config();
require("./config/db.config");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running in Port: ${process.env.PORT}`);
});
