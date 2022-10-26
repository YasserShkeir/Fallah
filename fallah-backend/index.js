const express = require("express");
require("dotenv").config();
require("./config/db.config");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/users.routes");
app.use("/users", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running in Port: ${process.env.PORT}`);
});
