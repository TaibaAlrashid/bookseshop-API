const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(
  async (username, password, done) => {}
);