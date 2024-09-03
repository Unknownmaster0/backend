const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    requirements: {
      type: String,
    },
    salary: {
      type: String,
      required: true,
    },
    applyLink: {
      type: String,
      required: true,
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = {
  Job,
};
