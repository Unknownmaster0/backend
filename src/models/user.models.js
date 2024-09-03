const mongoose = require('mongoose');
const { Job } = require('./job.models');
const { Story } = require('./story.models');
const { Event } = require('./event.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    yearOfPassing: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    programme: {
      type: String,
      required: true,
    },
    createdJob: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Job,
      },
    ],
    createdStory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Story,
      },
    ],
    createdEvent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event,
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// adding middleware in the userSchema to hash the password using bcrypt.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // but only do, when the password is being modified.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// adding custom method to validate the password
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creating a custom method for generating access token.
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
