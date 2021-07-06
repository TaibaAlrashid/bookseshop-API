const express = require("express");
const productRout = require("./API/product/routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db/models/index");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/products", productRout);

const run = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.log(error);
  }
};

run();
