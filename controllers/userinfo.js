const axios = require("axios");

const getGoogleUser = async ({ id_token, access_token }) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getGoogleUser;
