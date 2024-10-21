const crypto = require('crypto');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { User } = require('../models/user.models');
const { capitalise } = require('../utils/capitalise.utils');
const { userExist } = require('../utils/userExist');
const { getUserIdByToken } = require('../utils/getUserId');
const { sendEmailOtp } = require('../utils/email.otp');

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

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

const updateUser = asyncHandler(async (req, res) => {
  console.log(`req.body in updateuser`);
  console.log(req.body);

  const {
    fullName,
    collegeName,
    yearOfPassing,
    enrollmentNumber,
    phone,
    email,
    programme,
    branch,
    cgpa,
    companyName,
    currentJobTitle,
    experience,
    linkedinProfile,
    skills,
    hobbies,
  } = req.body;

  const userId = await getUserIdByToken(req.headers.authorization);

  try {
    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        fullName,
        collegeName,
        yearOfPassing,
        enrollmentNumber,
        phone,
        email,
        programme,
        branch,
        cgpa,
        companyName,
        currentJobTitle,
        experience,
        linkedinProfile,
        skills,
        hobbies,
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, 'Updated the user', updatedUser));
  } catch (err) {
    console.log(`error while updating the user: ${err}`);
    return res
      .status(500)
      .json(new ApiResponse(500, 'internal server error', ''));
  }
});

const showAllUsers = asyncHandler(async (req, res) => {
  // getting all the users with these fields in it.
  const user = await User.find().select(
    `fullName email yearOfPassing currentJobTitle _id`
  );
  return res.status(200).json(new ApiResponse(200, 'success', user));
});

// Function to send OTP to user
const sendOtp = asyncHandler(async (req, res) => {
  console.log(`I have reached in the sendOtp section`);

  const { email } = req.body;

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Retrieve user by token
    const userId = await getUserIdByToken(req.headers.authorization);
    const userObj = await User.findOne({ _id: userId });
    if (!userObj) {
      return res.status(404).json(new ApiResponse(404, 'User not found', ''));
    }

    // Store OTP in user object
    userObj.otp = otp;
    await userObj.save();

    // Send OTP email
    await sendEmailOtp(email, otp);

    return res
      .status(200)
      .json(new ApiResponse(200, 'OTP sent successfully', otp));
  } catch (err) {
    console.error('Failed while sending the OTP:', err);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Internal server error', ''));
  }
});

const viewProfile = asyncHandler(async (req, res) => {});

const showById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, 'User send successfully', user));
  } catch (err) {
    console.log(`error while fetching data from user in user controller`);
    res.status(500).json(new ApiResponse(500, 'Internal server issue', ''));
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  showAllUsers,
  sendOtp,
  showById,
  viewProfile,
};
