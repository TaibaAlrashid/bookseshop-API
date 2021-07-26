const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const { checkout } = require("./controllers");

const router = express.Router();

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
