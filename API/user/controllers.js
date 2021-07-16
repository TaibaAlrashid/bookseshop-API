const bcrypt = require("bcrypt");
const { User } = require("../../db/models/User");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {};
