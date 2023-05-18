const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { BadRequest } = require("../errors/index");

const jwtToken = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("wrong email or password");
  }
  const id = new Date().getDate;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  req.user = { token };
  next();
};

module.exports = jwtToken;
