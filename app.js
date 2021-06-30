const express = require("express");
const productRout = require("./API/product/routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/products", productRout);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
