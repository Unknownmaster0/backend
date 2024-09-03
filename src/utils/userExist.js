const { User } = require('../models/user.models');

const userExist = async function (email) {
  return await User.findOne({ email });
};

module.exports = {
  userExist,
};
