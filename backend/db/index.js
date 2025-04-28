const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/tms")
  .then(() => {
    console.log("Db got connected");
  })
  .catch(() => {
    console.log("Db connection failed");
  });
module.exports = mongoose;
