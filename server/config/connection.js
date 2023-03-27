const mongoose = require("mongoose");

mongoose.connect(
  // process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/techmatchup",
  "mongodb+srv://subhan:subhan@cluster0.pyiicf8.mongodb.net/gym",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// module.exports = mongoose.connection;
module.exports = {
  SECRET_KEY: "some very secret key",
  connection: mongoose.connection,
};
