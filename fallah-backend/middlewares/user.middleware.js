const userMiddleware = (req, res, next) => {
  if (
    req.user.userType !== "farmer" &&
    req.user.userType !== "buyer" &&
    req.user.userType !== "admin"
  ) {
    return res
      .status(401)
      .json({ message: "Unauthorized request: Not a User" });
  }
  next();
};

module.exports = userMiddleware;
