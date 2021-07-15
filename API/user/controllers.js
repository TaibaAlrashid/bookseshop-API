const bcrypt = require("bcrypt");
const User = require("../../db/models/User");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(req.body);
    req.body.password = hashedPassword;
    res.status(201).json({ nessage: "User created." });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {};
