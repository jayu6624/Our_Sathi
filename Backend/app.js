const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyparse = require('body-parser');
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());


app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
connectToDb();
module.exports = app;
