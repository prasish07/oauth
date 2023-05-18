const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const getGoogleUrl = require("../middleware/getGoogleUrl");
const googleOauthhandler = require("../controllers/googleOauthhanlder");

const auth = require("../middleware/auth");
const jwtToken = require("../middleware/jwtToken");

router.route("/dashboard").get(auth, dashboard);

router.route("/login").post(jwtToken, login);

router.route("/get").get((req, res) => {
  const googleOauthURL = getGoogleUrl();
  res.redirect(googleOauthURL);
});

router.route("/oauth/google").get(googleOauthhandler);

module.exports = router;
