const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { User } = require('../models/user.models');
const { capitalise } = require('../utils/capitalise.utils');
const { userExist } = require('../utils/userExist');

const registerUser = asyncHandler(async (req, res) => {
  // console.log(`req body in signup`);
  // console.log(req.body);

  const {
    collegeName,
    programme,
    fullName,
    yearOfPassing,
    enrollmentNumber,
    phone,
    email,
    password,
  } = req.body;

  //   check if any of the field should not be empty.
  if (
    [
      collegeName,
      programme,
      fullName,
      yearOfPassing,
      enrollmentNumber,
      phone,
      email,
      password,
    ].some((val) => val?.trim() === '')
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'Every field must be mandatory', ' '));
    // throw new ApiError(400, 'All fields must required!');
  }

  //   now, all fields are not empty, then check if user doesn't exist in db.
  const existedUser = await User.findOne({
    $or: [{ email }, { enrollmentNumber }, { phone }], // find any user with either the same email or enrollment number.
  });

  if (existedUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          'User already exist with this mail or enrollment number.',
          ' '
        )
      );
    // throw new ApiError(
    //   409,
    //   'User already exist with this mail or enrollment number.'
    // );
  }

  // now in this case we will store the user in db, and return the some data to user.
  const createdUser = await User.create({
    collegeName,
    programme,
    fullName,
    yearOfPassing,
    enrollmentNumber,
    phone,
    email,
    password,
  });

  // check if user is created successfully in the db.
  const objUser = await User.findById(createdUser?._id).select(
    '-password -createdJob -createdStory -createdEvent'
  );
  // if user is not created successfully
  if (!objUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          'User already exist with this mail or enrollment number.',
          ' '
        )
      );
    //   throw new ApiError(500, 'Internal server issue, while signingUp');
  }

  objUser.collegeName = capitalise(objUser.collegeName);
  objUser.fullName = capitalise(objUser.fullName);

  const token = objUser.generateToken();

  return res
    .status(201)
    .json(
      new ApiResponse(200, 'User created successfully!', { objUser, token })
    );
});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const crntUser = await userExist(email);

  if (!crntUser) {
    return res
      .status(404)
      .json(new ApiResponse(404, `User doesn't exist with this mail`, ' '));
  }

  // if user exist then do the password validation.
  const passwordCorrect = await crntUser.validatePassword(password);
  if (!passwordCorrect) {
    return res.status(404).json(new ApiResponse(404, `Password Wrong.`, ' '));
  }

  // if password is correct then take the token of the user and return the token to user.
  const token = crntUser.generateToken();

  return res.status(200).json(new ApiResponse(200, `User loged in`, { token }));
});

const updateUser = asyncHandler(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
};
