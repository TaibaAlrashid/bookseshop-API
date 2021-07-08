const express = require("express");
const productRout = require("./API/product/routes");
const shopRout = require("./API/shop/routes");
const cors = require("cors");
const bodyParser = require("body-parser");

//Database
const db = require("./db/models/index");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//ProductRoutes
app.use("/products", productRout);
app.use("/shops", shopRout);
app.use("/media", express.static("media"));

//Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

//Path not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.log(error);
  }
};

run();
