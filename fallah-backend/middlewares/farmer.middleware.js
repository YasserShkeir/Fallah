const farmerMiddleware = async (req, res, next) => {
  if (req.user.userType !== "farmer") {
    return res
      .status(401)
      .json({ message: "Unauthorized request: Not a Farmer" });
  }
  next();
};

module.exports = farmerMiddleware;
