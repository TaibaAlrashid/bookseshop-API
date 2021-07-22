const express = require("express");

const {
  productFetch,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("./controllers");

const multer = require("multer");
const passport = require("passport");
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

router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);

router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);

module.exports = router;
