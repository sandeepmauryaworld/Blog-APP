const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// env config
dotenv.config();

// router import
const userRoutes = require("./routes/userRoutes");

// mongodb coneection
connectDB();
//rest object

const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/user", userRoutes);

// port

const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode  port number ${PORT}`
      .bgCyan.white
  );
});
