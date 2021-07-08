const express = require("express");
const multer = require("multer");

const {
  productFetch,
  productDelete,
  productCreate,
  productUpdate,
  fetchProduct,
} = require("./controllers");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("product Not Found.");
    error.status = 404;
    next(error);
  }
});
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", productFetch);

router.delete("/:productId", productDelete);

router.post("/", upload.single("image"), productCreate);

router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
