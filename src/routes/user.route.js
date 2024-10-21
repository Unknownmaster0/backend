const { Router } = require('express');
const router = Router();
const {
  registerUser,
  loginUser,
  updateUser,
  showAllUsers,
  sendOtp,
  showById,
} = require('../controllers/user.controller');
const { authenticateUser } = require('../middlewares/user.middlware');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/update').post(authenticateUser, updateUser);
router.route('/community').get(authenticateUser, showAllUsers);
router.route('/send-email-otp').get(authenticateUser, sendOtp);
router.route('/:id').get(authenticateUser, showById);
// router.route('/verify-email-otp')

module.exports = {
  router,
};
