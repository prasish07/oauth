const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { UnauthenticatedError } = require("../errors/index");

const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("You dont have authorization");
  }
};

module.exports = authorizationMiddleware;
