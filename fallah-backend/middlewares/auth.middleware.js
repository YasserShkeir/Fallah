const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized request" });
  }
  let token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send({ message: "Unauthorized request" });
  } else {
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!payload) {
        return res.status(401).send({ message: "Unauthorized request" });
      }
      req.userId = payload.subject;
      let user = await User.User.findById(req.userId).select("-password");
      if (!user) {
        user = await User.Admin.findById(req.userId).select("-password");
        if (!user) {
          return res.status(401).send({ message: "Unauthorized request" });
        }
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ message: "Unauthorized request", error: error.message });
    }
  }
};

module.exports = authMiddleware;
