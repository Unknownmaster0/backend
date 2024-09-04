const { Router } = require('express');
const router = Router();
const { authenticateUser } = require('../middlewares/user.middlware');
const {
  createJob,
  viewJobs,
  userJob,
} = require('../controllers/job.controller');

router.route('/createJob').post(authenticateUser, createJob);
router.route('/viewJobs').get(authenticateUser, viewJobs);
router.route('/userJob').get(authenticateUser, userJob);

module.exports = {
  router,
};
