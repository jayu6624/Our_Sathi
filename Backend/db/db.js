const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
function connectToDb() {
  console.log(process.env.MONGODB);
  
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDb;
