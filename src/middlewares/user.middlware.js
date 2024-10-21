// const { Job } = require('../models/job.models');
const jwt = require('jsonwebtoken');
// const { userExist } = require('../utils/userExist');
const { ApiResponse } = require('../utils/ApiResponse');

const authenticateUser = function (req, res, next) {
  const token = req.headers.authorization;
  //   if token is empty means the user is not logged in, then not to do anything, send to login page to the user.
  if (!token) {
    return res
      .status(400)
      .json(new ApiResponse(404, 'User not logged in!', ''));
  }

  try {
    const userPayload = jwt.verify(token, process.env.ACCESS_TOKEN);
    next();
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(400).json(new ApiResponse(400, 'User not exist!', ''));
  }
};

module.exports = {
  authenticateUser,
};
