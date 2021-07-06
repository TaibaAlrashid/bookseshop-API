const express = require("express");

const {
  productFetch,
  productDelete,
  productCreate,
  productUpdate,
  fetchProduct,
} = require("./controllers");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchproduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("product Not Found.");
    error.status = 404;
    next(error);
  }
});

router.get("/", productFetch);

router.delete("/:productId", productDelete);

router.post("/", productCreate);

router.put("/:productId", productUpdate);

module.exports = router;
