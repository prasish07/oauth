const { google } = require("googleapis");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT
);

const googleOauthhandler = async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const userInfo = await google
      .people({ version: "v1", auth: oauth2Client })
      .people.get({
        resourceName: "people/me",
        personFields: "names,emailAddresses",
      });
    const googleUser = userInfo.data;

    if (!googleUser.emailAddresses[0].metadata.verified) {
      res.status(402).json({ msg: "Unauthorized" });
      return;
    }

    const username = googleUser.names[0].displayName;
    const id = new Date().getTime();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.redirect(`https://oauth-testing-server.onrender.com?token=${token}`);
  } catch (err) {
    console.error("Error retrieving tokens:", err);
    res.status(500).send("Error retrieving tokens");
  }
};

module.exports = googleOauthhandler;
