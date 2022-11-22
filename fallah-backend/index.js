const express = require("express");
require("dotenv").config();
require("./config/db.config");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./assets/images/users");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.array("photo", 3), (req, res) => {
  const fileName = req.files[0].path.split("\\").slice(-1)[0]; // Get the file name
  try {
    res.status(200).json({
      message: fileName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/download/:route/:id", (req, res) => {
  const route = req.params.route;
  const id = req.params.id;
  res.download(`./assets/images/${route}/${id}`);
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const userRoutes = require("./routes/users.routes");
app.use("/users", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running in Port: ${process.env.PORT}`);
});
