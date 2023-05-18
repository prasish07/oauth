const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, // Set useFindAndModify option to false
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
