const { response } = require("express");
const express = require("express");
const products = require("./products");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

//Routes
app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("HELLO!");
});
