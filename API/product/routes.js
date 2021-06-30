const express = require("express");

const {
  productFetch,
  productDelete,
  productCreate,
  productUpdate,
} = require("./controllers");

const router = express.Router();

router.get("/", productFetch);

router.delete("/:productId", productDelete);

router.post("/", productCreate);

router.put("/:productId", productUpdate);

module.exports = router;
