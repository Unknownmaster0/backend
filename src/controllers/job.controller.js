const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { User } = require('../models/user.models');
const { Job } = require('../models/job.models');
const { capitalise } = require('../utils/capitalise.utils');
const { getUserIdByToken } = require('../utils/getUserId');

const createJob = asyncHandler(async (req, res) => {
  console.log(`req.body`);
  console.log(req.body);

  const {
    jobTitle,
    company,
    location,
    jobType,
    description,
    requirements,
    salary,
    applyLink,
  } = req.body;

  // if has token, then user is logged in, check if required data must not be empty.
  if (
    [jobTitle, company, location, jobType, salary, applyLink].some(
      (val) => val?.trim() === ''
    )
  ) {
    // it means required field are not filled.
    return res
      .status(404)
      .json(new ApiResponse(404, 'Fields are necessary to field!', ''));
  }

  // if description and requirements are empty.
  let nRequirements = requirements;
  let ndescription = description;

  if (!nRequirements) {
    nRequirements = '';
  }
  if (!ndescription) {
    ndescription = '';
  }

  const userId = await getUserIdByToken(req.headers.authorization);
  // console.log(`userId`);
  // console.log(userId);

  //   created a new job object.
  const jobObj = await Job.create({
    jobTitle,
    company,
    location,
    jobType,
    salary,
    applyLink,
    description: ndescription,
    requirements: nRequirements,
    userCreated: userId,
  });

  jobObj.jobTitle = capitalise(jobTitle);
  jobObj.company = capitalise(company);
  jobObj.jobType = capitalise(jobType);

  console.log(`jobobj is `);
  console.log(jobObj);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Job created successfully!', jobObj));
});

const viewJobs = asyncHandler(async (req, res) => {
  const allJobs = await Job.find({}).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, 'all jobs posted', allJobs));
});

const userJob = asyncHandler(async (req, res) => {
  // get the id of the user.
  const userId = await getUserIdByToken(req.headers.authorization);

  const allJobsOfUser = await Job.find({ userCreated: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'All Jobs are send successfully', allJobsOfUser)
    );
});

module.exports = {
  createJob,
  viewJobs,
  userJob,
};
