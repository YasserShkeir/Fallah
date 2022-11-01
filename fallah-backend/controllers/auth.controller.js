const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.User.findOne({ email });

    if (!user) {
      const user = await User.Admin.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).send({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
          { subject: user._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).send({ token });
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { subject: user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).send({ token });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const register = async (req, res) => {
  const { name, email, phone, userType, password } = req.body;

  try {
    const user = await User.User.findOne({ email });
    if (user) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === "farmer") {
      const newUser = new User.Farmer({
        name,
        email,
        phone,
        userType,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } else if (userType === "buyer") {
      const newUser = new User.Buyer({
        name,
        email,
        phone,
        userType,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } else if (req.user === "admin") {
      const newUser = new User.User({
        name,
        email,
        phone,
        userType,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } else {
      res.status(400).send({ message: "Invalid user type" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = {
  login,
  register,
};
