const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(user.userId);
  });
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findOne({ where: { userId } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
