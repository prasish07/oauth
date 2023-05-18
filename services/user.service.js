const qs = require("qs");
const axios = require("axios");

const getGoogleOAuthToken = async ({ code }) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRECT,
    redirect_uri: process.env.GOOGLE_REDIRECT,
    grant_type: "authorization_code",
  };

  const body = qs.stringify(values);
  try {
    const res = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = getGoogleOAuthToken;
