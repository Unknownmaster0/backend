const { User } = require('../models/user.models');
const jwt = require('jsonwebtoken');

const getUserIdByToken = async (token) => {
  const user = jwt.decode(token); // getting the email of user from payload.
  const email = user.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return user._id;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

module.exports = {
  getUserIdByToken,
};
