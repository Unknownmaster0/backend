const { Router } = require('express');
const router = Router();
const { authenticateUser } = require('../middlewares/user.middlware');
const {
  showAllStory,
  showUserCreatedStory,
  createStory,
} = require('../controllers/story.controller');

router.route('/createStory').post(authenticateUser, createStory);
router.route('/showAllStory').post(showAllStory);
router
  .route('/showUserCreatedStory')
  .post(authenticateUser, showUserCreatedStory);

module.exports = {
  router,
};
