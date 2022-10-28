const buyerMiddleware = (req, res, next) => {
  if (req.user.userType !== "buyer") {
    return res
      .status(401)
      .json({ message: "Unauthorized request: Not a Buyer" });
  }
  next();
};

module.exports = buyerMiddleware;
