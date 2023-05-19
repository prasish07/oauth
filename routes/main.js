const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const getGoogleOauthURL = require("../middleware/getGoogleOauthURL");
const googleOauthhandler = require("../controllers/googleOauthhanlder");

const auth = require("../middleware/auth");
const jwtToken = require("../middleware/jwtToken");

router.route("/dashboard").get(auth, dashboard);

router.route("/login").post(jwtToken, login);

router.route("/get").get(async (req, res) => {
  try {
    const googleOauthURL = await getGoogleOauthURL();
    res.redirect(googleOauthURL);
  } catch (error) {
    console.error("Error generating Google OAuth2 URL:", error);
    res.status(500).send("Error generating Google OAuth2 URL");
  }
});

router.route("/oauth/google").get(googleOauthhandler);

module.exports = router;
