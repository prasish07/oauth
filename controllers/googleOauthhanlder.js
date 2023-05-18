const getGoogleOAuthToken = require("../services/user.service");
const getGoogleUser = require("./userinfo");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const googleOauthhandler = async (req, res) => {
  //get the code from qs
  const code = req.query.code;

  //get the id and access token with the code
  const { id_token, access_token } = await getGoogleOAuthToken({ code });

  //get user with token
  const googleUser = await getGoogleUser({
    id_token: id_token,
    access_token: access_token,
  });
  if (!googleUser.email_verified) {
    res.status(402).json({ msg: "unaurized" });
  }
  const username = googleUser.name;

  const id = new Date().getDate;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //redirect to dashboard
  res.redirect(`http://localhost:3000?token=${token}`);
};

module.exports = googleOauthhandler;
