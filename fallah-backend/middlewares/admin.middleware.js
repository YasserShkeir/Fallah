const adminMiddleware = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res
      .status(401)
      .json({ message: "Unauthorized request: Not an Admin" });
  }
  next();
};

module.exports = adminMiddleware;
